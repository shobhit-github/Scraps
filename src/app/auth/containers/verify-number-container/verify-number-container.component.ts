import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import * as countryData from 'country-telephone-data';
import {Observable, Subscription, timer} from 'rxjs';
import {map, mergeMap, take} from 'rxjs/operators';

import * as authActions from '../../actions/auth.actions';
import * as verifyActions from '../../actions/verify.actions';
import {ICountry} from '../../interfaces/verify.interface';
import * as fromVerify from '../../reducers';

@Component({
    selector: 'app-verify-number-container',
    templateUrl: './verify-number-container.component.html',
    styleUrls: ['./verify-number-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyNumberContainerComponent implements OnInit, OnDestroy {
    @Input()
    public activeClass;
    @Output()
    public OnCompleted = new EventEmitter<undefined>();
    public timer$: Observable<number>;
    public phoneAndCountry$: Observable<{ phone: string; country: string }>;
    public phone: string;
    public country: string;
    public step$: Observable<number>;
    public isPending$: Observable<boolean>;
    public phoneSuccess$: Observable<boolean>;
    public phoneFailed$: Observable<boolean>;
    public codeSuccess$: Observable<boolean>;
    public codeFailed$: Observable<boolean>;
    public countryList: Array<ICountry> = countryData.allCountries;
    public countryList$: Observable<Array<ICountry>>;
    public defultCountry: ICountry = countryData.allCountries.filter(
        (country: ICountry) => Number(country.dialCode) === 44,
    )[0];
    public controlForm: FormGroup;
    private numControlConfig: Array<string | Validators> = [
        '',
        Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(1),
            Validators.pattern(/[0-9]/),
            Validators.required,
        ]),
    ];

    private codeGroupConfig: { [key: string]: Array<string | Validators> } = {
        num1: [...this.numControlConfig],
        num2: [...this.numControlConfig],
        num3: [...this.numControlConfig],
        num4: [...this.numControlConfig],
    };
    public controlCode: FormGroup = this.fb.group(this.codeGroupConfig);
    private subscribersList: Array<Subscription> = [];

    constructor(
        private fb: FormBuilder,
        private store: Store<fromVerify.State>,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.step$ = this.store.select(fromVerify.selectVerifyStepState);
        this.phoneAndCountry$ = this.store.pipe(
            select(fromVerify.getPhoneAndCountry),
        );
        this.subscribersList.push(
            this.phoneAndCountry$.subscribe(({phone, country}) => {
                this.phone = phone;
                this.country = country;
            }),
        );
        this.phoneSuccess$ = this.store.select(
            fromVerify.selectVerifyPhoneSuccessState,
        );
        this.phoneFailed$ = this.store.select(
            fromVerify.selectVerifyPhoneFailedState,
        );
        this.codeSuccess$ = this.store.select(
            fromVerify.selectVerifyCodeSuccessState,
        );
        this.codeFailed$ = this.store.select(
            fromVerify.selectVerifyCodeFailedState,
        );
        this.controlForm = this.fb.group({
            countryControl: this.defultCountry,
            number: [
                '',
                Validators.compose([
                    Validators.minLength(10),
                    Validators.maxLength(11),
                    Validators.pattern(/[0-9]{10,11}/),
                    Validators.required,
                ]),
            ],
        });
        this.subscribersList.push(
            this.codeSuccess$.subscribe(codeSuccess => {
                if (codeSuccess) {
                    this.onCompleted();
                }
            }),
        );
        this.subscribersList.push(
            this.phoneFailed$.subscribe(phoneFailed => {
                if (phoneFailed) {
                    this.controlForm.get('number').setErrors({exist: true});
                } else {
                    this.controlForm.get('number').setErrors(null);
                }
            }),
        );
        this.subscribersList.push(
            this.codeFailed$.subscribe(codeFailed => {
                if (codeFailed) {
                    this.controlCode.setErrors({invalid: true});
                } else {
                    this.controlCode.setErrors(null);
                }
            }),
        );
    }

    public onNext() {
        this.store.dispatch(new verifyActions.NextStep());
    }

    public onCompleted() {
        this.OnCompleted.emit();
    }

    public onBack(logout: boolean) {
        if (logout) {
            // this.store.dispatch(new authActions.Logout());
            this.store.dispatch(new authActions.RegisterReset());
        } else {
            this.store.dispatch(new verifyActions.BackStep());
        }
    }

    public onResend() {
        this.store.dispatch(
            new verifyActions.ResendRegisterCode(),
        );
        const start = 60;
        this.timer$ = timer(1000, 1000).pipe(
            map(i => start - i),
            take(start + 1),
        );
    }

    public onSendCode() {
        if (this.controlCode.valid || this.controlCode.pending) {
            const codeParts: {
                num1: number;
                num2: number;
                num3: number;
                num4: number;
            } = this.controlCode.value;
            const code = Object.values(codeParts)
                .map(num => String(num))
                .reduce((part, num) => `${part}${num}`);
            if (code) {
                this.store.dispatch(new verifyActions.CodeSend({code}));
            }
        }
    }

    public onSendPhone() {
        if (this.controlForm.valid || this.controlForm.pending) {
            const phoneParts: { countryControl: ICountry; number: string } = this
                .controlForm.value;
            const code = phoneParts.countryControl.dialCode;
            const phone = phoneParts.number;
            if (code && phone) {
                this.store.dispatch(
                    new verifyActions.PhoneSend({
                        phone: `+${code}${phone}`,
                        country: this.controlForm.value.countryControl.name,
                    }),
                );
            }
        }
    }

    ngOnDestroy() {
        this.subscribersList.forEach(sub => sub.unsubscribe());
    }
}
