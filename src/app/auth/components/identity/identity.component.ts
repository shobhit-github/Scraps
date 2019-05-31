import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {EIdentity} from '../../interfaces/identity.enum';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';
import {MatInput, MatDialogRef} from '@angular/material';
import {IdentityContainerComponent} from '../../containers/identity-container/identity-container.component';

@Component({
    selector: 'app-identity',
    templateUrl: './identity.component.html',
    styleUrls: ['./identity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityComponent implements OnInit {
    public EIdentity = EIdentity;
    @Input()
    public isPopup: boolean;
    @Input()
    public activeClass;
    @Input()
    public form: FormGroup;
    @Input()
    public type: EIdentity;
    @Input()
    public isPending: boolean;
    @Input()
    public uploadSuccess: boolean;
    @Input()
    public uploadFailed: boolean;
    @Output()
    public OnTypeChange = new EventEmitter<EIdentity>();
    @Output()
    public OnSubmit = new EventEmitter<{
        fileList: Array<File>;
        type: EIdentity;
    }>();
    @Output()
    public OnCompleted = new EventEmitter<undefined>();
    @Output()
    public OnBack = new EventEmitter<undefined>();
    @Output()
    public OnSkip = new EventEmitter<undefined>();
    @Input()
    public dialogRef: MatDialogRef<IdentityContainerComponent>;
    @ViewChild('fileDialog', {read: ElementRef})
    public fileDialog: ElementRef;

    public reader = new FileReader();

    public files = [];

    constructor(public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
    }

    public closePopup() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    public onTypeChange(type: EIdentity) {
        this.OnTypeChange.emit(type);
    }

    public onSubmit(event) {
        const files = (event.target || event.srcElement).files;
        this.OnSubmit.emit({
            fileList: Array.from(files),
            type: this.type,
        });
    }

    public onCompleted() {
        this.OnCompleted.emit();
    }

    public onBack() {
        this.OnBack.emit();
    }

    public openFileDialog() {
        this.fileDialog.nativeElement.click();
    }
}
