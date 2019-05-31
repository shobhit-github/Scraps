import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit,
    ElementRef,
    OnChanges,
} from '@angular/core';
import {VerifyNumberComponent} from '../../../auth/components/verify-number/verify-number.component';
import {FormGroup} from '@angular/forms';
import {ICountry} from '../../../auth/interfaces/verify.interface';
import {Observable} from 'rxjs';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';
import {startWith, map, tap} from 'rxjs/operators';
import {
    MatInput,
    MatAutocompleteTrigger,
    MatDialogRef,
} from '@angular/material';

@Component({
    selector: 'app-change-phone-settings',
    templateUrl: './change-phone-settings.component.html',
    styleUrls: ['./change-phone-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangePhoneSettingsComponent
    implements OnInit, AfterViewInit, OnChanges {
    @Input() public pending: boolean;
    @Input() public defultCountry: ICountry;
    @Input() public formPhone: FormGroup;
    @Input() public formCode: FormGroup;
    @Input() public step;

    @Input()
    public set error(err) {
        if (this.formPhone && this.formPhone.get('phone')) {
            if (err) {
                this.formPhone.get('phone').setErrors({exist: true});
            } else {
                this.formPhone.get('phone').setErrors(null);
            }
        }
        if (this.formCode && this.formCode.get('code')) {
            if (err) {
                this.formCode.get('code').setErrors({invalid: true});
            } else {
                this.formCode.get('code').setErrors(null);
            }
        }
    }

    @Input() public countryList: Array<ICountry>;
    @Input() public countryList$: Observable<Array<ICountry>>;
    @ViewChild('hack', {read: ElementRef})
    public focusHack: ElementRef;
    @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
    public onUpdatePhone: Function;
    public onUpdatePhoneWithCode: Function;
    public onResend: Function;
    private firstStepForm: FormGroup;
    public hacked = false;
    public codeMask = {
        mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    };
    public decimalMask = {
        mask: [
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
            /[0-9]/,
        ],
        guide: false,
    };

    constructor(
        public matcher: MyErrorStateMatcher,
        public dialogRef: MatDialogRef<ChangePhoneSettingsComponent>,
    ) {
    }

    ngOnInit() {
        // this.countryList$ = this.formPhone.get('countryControl').valueChanges.pipe(
        //   startWith<string | ICountry>(''),
        //   map(value => (typeof value === 'string' ? value : value.name)),
        //   map((name: string) => (name ? this.filter(name) : this.countryList)),
        // );
    }

    ngAfterViewInit() {
        setTimeout(() => {
            // console.log(this.focusHack);
            // this.focusHack.nativeElement.click();
            this.hacked = true;
            // console.log('this.trigger.closePanel()');
            // this.trigger.closePanel();
        }, 1000);
        // console.log('this.trigger.closePanel()');
        // this.trigger.closePanel();
    }

    ngOnChanges() {
        // setTimeout(() => {
        //   console.log(this.focusHack);
        //   // this.focusHack.nativeElement.click();
        //   console.log('this.trigger.closePanel()');
        //   this.trigger.closePanel();
        //   this.hacked = true;
        // }, 1000);
        // console.log('this.trigger.closePanel()');
        // this.trigger.closePanel();
    }

    filter(name: string): ICountry[] {
        return this.countryList.filter(
            option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0,
        );
    }

    displayFn(country?: ICountry): string | undefined {
        return country ? country.name : undefined;
    }

    onResendCode() {
        // this.OnResend.emit();
    }

    private calcPhone(form: FormGroup) {
        return {
            code: form.value.countryControl.dialCode,
            phone: form.value.number,
        };
    }

    onSendCode(form: FormGroup) {
        if (form.valid || form.pending) {
            const {code, phone} = this.calcPhone(this.firstStepForm);
            if (code && phone) {
                this.onUpdatePhoneWithCode({
                    phone: `+${code}${phone}`,
                    country: this.firstStepForm.value.countryControl.name,
                    code: form.value.code,
                });
            }
        }
    }

    onSendPhone(form: FormGroup) {
        if (form.valid || form.pending) {
            this.firstStepForm = form;
            const {code, phone} = this.calcPhone(form);
            if (code && phone) {
                this.onUpdatePhone({
                    phone: `+${code}${phone}`,
                    country: form.value.countryControl.name,
                });
            }
        }
    }
}
