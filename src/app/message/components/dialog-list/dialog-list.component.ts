import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-dialog-list',
    templateUrl: './dialog-list.component.html',
    styleUrls: ['./dialog-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
