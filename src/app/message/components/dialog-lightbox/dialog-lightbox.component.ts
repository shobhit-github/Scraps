import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material';
import {IFileMessageResponse} from '../../interfaces/chat.interfaces';

@Component({
    selector: 'app-dialog-lightbox',
    templateUrl: './dialog-lightbox.component.html',
    styleUrls: ['./dialog-lightbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogLightboxComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogLightboxComponent>,
        @Inject(MAT_DIALOG_DATA) public attachedDoc: IFileMessageResponse,
    ) {
    }

    ngOnInit() {
    }
}
