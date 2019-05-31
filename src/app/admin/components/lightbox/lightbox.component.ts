import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EStatusesSource} from '../../interfaces/table.interfaces';

@Component({
    selector: 'app-lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxComponent implements OnInit {
    public EStatusesSource = EStatusesSource;

    constructor(
        public dialogRef: MatDialogRef<LightboxComponent>,
        @Inject(MAT_DIALOG_DATA) public attachedDocs: Array<string>,
    ) {
    }

    ngOnInit() {
    }
}
