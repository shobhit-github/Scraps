import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    Inject,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
    selector: 'app-referral-settings',
    templateUrl: './referral-settings.component.html',
    styleUrls: ['./referral-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralSettingsComponent implements OnInit, OnChanges {
    @Input() public link: string;
    public copied = false;
    public form = this.fb.group({
        link: this.fb.control({
            value: '',
        }),
    });

    constructor(private fb: FormBuilder, @Inject(DOCUMENT) public doc: Document) {
    }

    private save(form: FormGroup, link: string) {
        form.get('link').setValue(link);
    }

    ngOnInit() {
        this.save(this.form, this.link);
    }

    ngOnChanges() {
        this.save(this.form, this.link);
    }

    copy(el: HTMLInputElement) {
        // el.focus();
        el.select();
        this.doc.execCommand('copy');
        this.copied = true;
    }
}
