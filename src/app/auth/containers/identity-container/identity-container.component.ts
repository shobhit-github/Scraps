import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {MatDialogRef} from '../../../../../node_modules/@angular/material';
import * as IdentityActions from '../../actions/identity.actions';
import {EIdentity} from '../../interfaces/identity.enum';
import * as fromIdentity from '../../reducers';

@Component({
    selector: 'app-identity-container',
    templateUrl: './identity-container.component.html',
    styleUrls: ['./identity-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityContainerComponent implements OnInit {
    @Input()
    public isPopup: boolean;
    @Input()
    public activeClass;
    @Input()
    public dialogRef: MatDialogRef<IdentityContainerComponent>;
    @Output()
    public OnCompleted = new EventEmitter<undefined>();
    public photoGroup: FormGroup;
    public type$: Observable<EIdentity>;
    public isPending$: Observable<boolean>;
    public uploadSuccess$: Observable<boolean>;
    public uploadFailed$: Observable<boolean>;

    constructor(
        private fb: FormBuilder,
        private store: Store<fromIdentity.State>,
    ) {
        this.photoGroup = this.fb.group({
            photo: ['', Validators.required],
        });
        this.type$ = this.store.pipe(select(fromIdentity.selectIdetityTypeState));
        this.isPending$ = this.store.pipe(
            select(fromIdentity.selectIdetityPendingState),
        );
        this.uploadSuccess$ = this.store.pipe(
            select(fromIdentity.selectIdetityUploadSuccessState),
        );
        this.uploadFailed$ = this.store.pipe(
            select(fromIdentity.selectIdetityUploadFailedState),
        );
    }

    ngOnInit() {
    }

    public onTypeChange(type: EIdentity) {
        this.store.dispatch(new IdentityActions.ChangeType(type));
    }

    public onFileUpload({
                            fileList,
                            type,
                        }: {
        fileList: Array<File>;
        type: EIdentity;
    }) {
        const fileData = fileList.map(file => this.prepareData(file));
        this.store.dispatch(
            new IdentityActions.Upload({identityData: fileData, type}),
        );
    }

    public prepareData(file: File): FormData {
        const formData = new FormData();
        formData.append('image', file);
        // formData.append('type', String(type));
        return formData;
    }

    onCompleted() {
        this.OnCompleted.emit();
    }

    onBack() {
        this.store.dispatch(new IdentityActions.ResetType());
    }
}
