import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {IProfileSettings} from '../../interfaces/profile.interfaces';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnInit, OnChanges {
    @Input() public data: IProfileSettings;
    @Output() public OnSubmit = new EventEmitter<FormData>();
    @Output() public OnAvatarChange = new EventEmitter<File>();
    public avatar: File;
    public form: FormGroup = this.fb.group({
        nickname: null,
        id: null,
        user_id: null,
        avatar: null,
    });

    constructor(private fb: FormBuilder, public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
        this.saveToForm(this.data);
    }

    ngOnChanges() {
        this.saveToForm(this.data);
    }

    onSubmit(form: FormGroup) {
        const value = form.value;
        const formData = new FormData();
        Object.entries(value)
            .filter(([key]) => key !== 'avatar')
            .map(([key, val]) => {
                formData.append(key, String(val));
            });
        if (this.avatar) {
            formData.append('avatar', this.avatar);
        }
        this.OnSubmit.emit(formData);
    }

    private saveToForm(data: IProfileSettings): void {
        if (data) {
            this.form.setValue(data);
        }
    }

    public saveFile(avatar: File) {
        this.avatar = avatar;
        this.OnAvatarChange.emit(avatar);
    }
}
