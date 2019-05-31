import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent implements OnInit {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: { isError: boolean; text: string },
        private ref: MatSnackBarRef<SnackBarComponent>,
    ) {
    }

    ngOnInit() {
    }

    dismiss() {
        this.ref.dismiss();
    }
}
