import {animate, style, transition, trigger} from '@angular/animations';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('enterAnimation', [
            transition(':enter', [
                style({width: 0}),
                animate('100ms', style({width: '140px'})),
            ]),
            transition(':leave', [
                style({width: '140px'}),
                animate('100ms', style({width: 0})),
            ]),
        ]),
    ],
})
export class TypeComponent implements OnInit {
    @Input()
    public userId: number;
    @Input()
    public pending: boolean;

    @Input()
    public set success(val) {
        if (val) {
            this.form.get('message').reset();
            // this.displayPlaceholder = true;
        }
    }

    @Output()
    public OnSend = new EventEmitter<{ message: string; receiver_id: number }>();
    public displayPlaceholder = true;
    public form = this.fb.group({
        message: ['', Validators.compose([Validators.maxLength(10000)])],
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
    }

    onSend() {
        this.OnSend.emit({
            message: this.form.get('message').value,
            receiver_id: this.userId,
        });
        this.form.get('message').reset();
    }

    sendByEnter(event: KeyboardEvent) {
        if (!event.shiftKey && event.keyCode === 13) {
            event.preventDefault();
            this.onSend();
        }
    }

    focus(event: FocusEvent) {
        if (event.target) {
            event.target.dispatchEvent(new Event('focus'));
            this.displayPlaceholder = false;
        }
    }
}
