import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    QueryList,
    ViewChildren,
} from '@angular/core';
import {Subscription} from 'rxjs';

import {CardService} from '../../services/card.service';

@Component({
    selector: 'app-stripe-form',
    templateUrl: './stripe-form.component.html',
    styleUrls: ['./stripe-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripeFormComponent implements AfterContentInit, OnDestroy {
    public isErr = true;
    public pending = false;
    private subList: Array<Subscription> = [];
    public readonly elementStyles = {
        base: {
            color: '#32325D',
            fontWeight: 500,
            fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
            fontSize: '16px',
            fontSmoothing: 'antialiased',

            '::placeholder': {
                color: '#CFD7DF',
            },
            ':-webkit-autofill': {
                color: '#e39f48',
            },
        },
        invalid: {
            color: '#E25950',

            '::placeholder': {
                color: '#FFCCA5',
            },
        },
    };
    public readonly elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'invalid',
    };
    @ViewChildren('input', {read: ElementRef})
    public inputs: QueryList<ElementRef>;

    constructor(
        private cardService: CardService,
        private cd: ChangeDetectorRef,
    ) {
    }

    public ngAfterContentInit() {
        this.subList.push(
            this.cardService
                .init(this.elementStyles, this.elementClasses, {
                    numberId: '#card-number',
                    expiryId: '#card-expiry',
                    cardCvcId: '#card-cvc',
                    formClass: 'stripe-form',
                })
                .subscribe(),
        );
        this.subList.push(
            this.cardService.onError.subscribe((err: boolean) => {
                this.isErr = err;
                this.cd.detectChanges();
            }),
        );
        this.subList.push(
            this.cardService.onPending.subscribe((p: boolean) => {
                this.pending = p;
                this.cd.detectChanges();
            }),
        );
    }

    ngOnDestroy() {
        this.subList.forEach(sub => sub.unsubscribe());
    }
}
