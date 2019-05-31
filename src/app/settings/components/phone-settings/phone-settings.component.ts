import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {ISecuritySettings} from '../../interfaces/security.interfaces';

@Component({
    selector: 'app-phone-settings',
    templateUrl: './phone-settings.component.html',
    styleUrls: ['./phone-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneSettingsComponent implements OnInit, OnChanges {
    @Input() public data: ISecuritySettings;
    @Input() public step: number;
    @Output() public OnChangePhone = new EventEmitter<undefined>();
    public form = this.fb.group({
        phone: this.fb.control({value: '', disabled: true}),
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.save(this.data.phone);
    }

    ngOnChanges() {
        this.save(this.data.phone);
    }

    private save(phone: string) {
        if (phone) {
            phone = `+${'x'.repeat(phone.length - 11)} xxx xxx xx${phone.slice(-2)}`;
        }
        this.form.get('phone').setValue(phone);
    }
}
