import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';

import {BanksService} from '../../../auth/services/banks.service';
import * as fromStore from '../../../banks/reducers/bank.reducer';
import {SnackBarComponent} from '../../components/snack-bar/snack-bar.component';
import {ScriptsService} from '../../services/scripts/scripts.service';

declare var Plaid: any;
declare var jQuery: any;

@Component({
    selector: 'app-plaid-container',
    templateUrl: './plaid-container.component.html',
    styleUrls: ['./plaid-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaidContainerComponent implements OnInit, OnDestroy {
    public ready = false;
    @Output()
    public OnConnected = new EventEmitter<boolean>();

    @Input()
    set isReady(ok: boolean) {
        if (!this.access_token && ok && !this.ready) {
            this.script
                .load('jquery', 'plaid')
                .then(() => {
                    return this.getPublicData();
                })
                .then(({plaid_public_key, plaid_environment}) =>
                    this.initPlaid(plaid_public_key, plaid_environment),
                )
                .catch(error => console.log(error));
        }
    }

    @Input()
    isRegister = false;
    public handler;
    public access_token: string;
    public plaidStatus$ = new BehaviorSubject<boolean>(false);
    public form: FormGroup;

    constructor(
        private store: Store<fromStore.State>,
        private script: ScriptsService,
        private banksService: BanksService,
        private router: Router,
        public snackBar: MatSnackBar,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
    ) {
        this.form = this.fb.group({
            system: ['plaid', Validators.required],
        });
    }

    async getPublicData(): Promise<{
        plaid_public_key: string;
        plaid_environment: string;
    }> {
        return this.banksService.getPublic().toPromise();
    }

    ngOnDestroy() {
        if (typeof jQuery !== 'undefined') {
            jQuery('body').off('click', '#link-btn');
        }
    }

    onSuccess(public_token, metadata) {
        this.banksService.getAccess(public_token, metadata).subscribe(
            data => {
                jQuery('#container').fadeOut('fast', function () {
                    jQuery('#intro').hide();
                    jQuery('#app, #steps').fadeIn('slow');
                });
                this.access_token = data.access_token;
                this.openSnackBar();
                this.plaidStatus$.next(!!data);
                this.OnConnected.emit(!!data);
            },
            () => this.openSnackBar(true),
        );
    }

    onExit(err, metadata) {
        // The user exited the Link flow.
        if (err != null) {
            this.openSnackBar(true);
        }
        // metadata contains information about the institution
        // that the user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
    }

    onEvent(eventName, metadata) {
        // Optionally capture Link flow events, streamed through
        // this callback as your users connect an Item to Plaid.
        // For example:
        // eventName = "TRANSITION_VIEW"
        // metadata  = {
        //   link_session_id: "123-abc",
        //   mfa_type:        "questions",
        //   timestamp:       "2017-09-14T14:42:19.350Z",
        //   view_name:       "MFA",
        // }
    }

    openSnackBar(isError: boolean = false) {
        this.snackBar.openFromComponent(SnackBarComponent, {
            data: {isError},
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: isError ? ['snack', 'snack_err'] : ['snack'],
        });
    }

    initPlaid(plaid_public_key: string, plaid_environment: string) {
        this.ready = true;
        this.cd.detectChanges();
        // Holy shit, I love plaid
        const handler = Plaid.create({
            apiVersion: 'v2',
            clientName: 'Skraps',
            env: plaid_environment,
            product: ['transactions', 'auth'],
            key: plaid_public_key,
            onSuccess: this.onSuccess.bind(this),
            onExit: this.onExit.bind(this),
        });
        jQuery('body').on('click', '#link-btn', function (e) {
            handler.open();
        });
        jQuery('#get-accounts-btn').on('click', function (e) {
            jQuery.get('/accounts', function (data) {
                jQuery('#get-accounts-data').slideUp(function () {
                    let html = '';
                    data.accounts.forEach(function (account, idx) {
                        html += '<div class="inner">';
                        html +=
                            '<strong>' +
                            account.name +
                            ' $' +
                            (account.balances.available != null
                                ? account.balances.available
                                : account.balances.current) +
                            '</strong><br>';
                        html += account.subtype + ' ' + account.mask;
                        html += '</div>';
                    });
                    jQuery(this)
                        .html(html)
                        .slideDown();
                });
            });
        });
        jQuery('#get-item-btn').on('click', function (e) {
            jQuery.post('/item', function (data) {
                jQuery('#get-item-data').slideUp(function () {
                    if (data.error) {
                        jQuery(this)
                            .html('<p>' + data.error + '</p>')
                            .slideDown();
                    } else {
                        let html = '<div class="inner">';
                        html += `<p>Here's some basic information about your Item:</p>`;
                        html += '<p>Institution name:' + data.institution.name + '</p>';
                        html +=
                            '<p>Billed products: ' +
                            data.item.billed_products.join(', ') +
                            '</p>';
                        html +=
                            '<p>Available products: ' +
                            data.item.available_products.join(', ') +
                            '</p>';
                        html += '</div>';
                        jQuery(this)
                            .html(html)
                            .slideDown();
                    }
                });
            });
        });
        jQuery('#get-transactions-btn').on('click', function (e) {
            jQuery.post('/transactions', function (data) {
                if (data.error != null) {
                    // Format the error
                    let errorHtml =
                        '<div class="inner"><p>' +
                        '<strong>' +
                        data.error.error_code +
                        ':</strong> ' +
                        data.error.error_message +
                        '</p></div>';
                    if (data.error.error_code === 'PRODUCT_NOT_READY') {
                        // Add additional context for `PRODUCT_NOT_READY` errors
                        errorHtml +=
                            '<div class="inner"><p>The PRODUCT_NOT_READY ' +
                            'error is returned when a request to retrieve Transaction data ' +
                            'is made before Plaid finishes the <a href="https://plaid.com/' +
                            'docs/quickstart/#transaction-data-with-webhooks">initial ' +
                            'transaction pull.</a></p></div>';
                    }
                    // Render the error
                    jQuery('#get-transactions-data').slideUp(function () {
                        jQuery(this).slideUp(function () {
                            jQuery(this)
                                .html(errorHtml)
                                .slideDown();
                        });
                    });
                } else {
                    jQuery('#get-transactions-data').slideUp(function () {
                        let html = '';
                        data.transactions.forEach(function (txn, idx) {
                            html += '<div class="inner">';
                            html += '<strong>' + txn.name + '</strong><br>';
                            html += '$' + txn.amount;
                            html += '<br><em>' + txn.date + '</em>';
                            html += '</div>';
                        });
                        jQuery(this).slideUp(function () {
                            jQuery(this)
                                .html(html)
                                .slideDown();
                        });
                    });
                }
            });
        });
    }

    openPlaid() {
        // this.handler.open();
    }

    ngOnInit() {
        if (!this.isRegister) {
            this.isReady = true;
        }
    }
}
