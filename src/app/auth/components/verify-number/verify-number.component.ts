import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    Input,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
// import {
//   trigger,
//   transition,
//   group,
//   query,
//   style,
//   animate,
// } from '@angular/animations';
import {ICountry} from '../../interfaces/verify.interface';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';

@Component({
    selector: 'app-verify-number',
    templateUrl: './verify-number.component.html',
    styleUrls: ['./verify-number.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // animations: [
    //   trigger('enterAnimation', [
    //     transition(':enter', [
    //       style({ transform: 'translateX(110%)' }),
    //       animate(300, style({ transform: 'translateX(0%)' })),
    //     ]),
    //     transition(':leave', [
    //       style({ transform: 'translateX(0%)' }),
    //       animate(300, style({ transform: 'translateX(-110%)' })),
    //     ]),
    //   ]),
    // ],
})
export class VerifyNumberComponent implements OnInit {
    @Input() public activeClass;
    @Input() public timer: number;
    @Input() public isPending: boolean;
    @Input() public defultCountry: ICountry;
    @Input() public controlForm: FormGroup;
    @Input() public step = 1;
    @Input() public controlCode: FormGroup;
    @Input() public phoneSuccess: boolean;
    @Input() public phoneFailed: boolean;
    @Input() public codeSuccess: boolean;
    @Input() public codeFailed: boolean;
    @Output() public OnSendPhone = new EventEmitter<undefined>();
    @Output() public OnSendCode = new EventEmitter<undefined>();
    @Output() public OnBack = new EventEmitter<boolean>();
    @Output() public OnResend = new EventEmitter<undefined>();
    @Input() public countryList: Array<ICountry>;
    @Input() public countryList$: Observable<Array<ICountry>>;
    public oneDecimalMask = {mask: [/[0-9]/]};
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

    constructor(public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
        this.countryList$ = this.controlForm
            .get('countryControl')
            .valueChanges.pipe(
                startWith<string | ICountry>(''),
                map(value => (typeof value === 'string' ? value : value.name)),
                map((name: string) => (name ? this.filter(name) : this.countryList)),
            );
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
        this.OnResend.emit();
    }

    keytab(
        e: KeyboardEvent,
        nextElement?: HTMLInputElement,
        controlName?: string,
        prevElement?: HTMLInputElement,
    ) {
        const target: HTMLInputElement = <HTMLInputElement>e.target;

        if (/[0-9]/.test(e.key) && target.value) {
            if (controlName && target.value !== e.key) {
                this.controlCode.get(controlName).setValue(e.key);
            }
            if (nextElement) {
                nextElement.focus();
            }
        }
        if (prevElement && e.key === 'Backspace') {
            // TODO: add double backspace
            prevElement.focus();
        }
    }

    onSendCode() {
        this.OnSendCode.emit();
    }

    onSendPhone() {
        this.OnSendPhone.emit();
    }

    onBack({logout} = {logout: false}) {
        this.OnBack.emit(logout);
    }
}
