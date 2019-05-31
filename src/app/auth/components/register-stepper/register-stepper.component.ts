import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

@Component({
    selector: 'app-register-stepper',
    templateUrl: './register-stepper.component.html',
    styleUrls: ['./register-stepper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterStepperComponent implements OnInit {
    @Input() public step = 1;
    @Output() public OnStepChanged = new EventEmitter<number>();
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    public activeClass$ = new BehaviorSubject({active: false});
    completedDynamic = {verifyNumber: false};

    constructor(private _formBuilder: FormBuilder, private router: Router) {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
        });
    }

    onStepChanged(newStep: number) {
        this.OnStepChanged.emit(newStep);
        this.activeClass$.next({active: false});
    }

    ngOnInit() {
    }

    onNext(stepper: MatStepper, hard?: boolean) {
        if (hard) {
            stepper.linear = false;
        }
        if (stepper && stepper._steps) {
            stepper.next();
        }
        if (hard) {
            stepper.linear = true;
        }
    }

    onAnimationDone() {
        this.activeClass$.next({active: true});
    }
}
