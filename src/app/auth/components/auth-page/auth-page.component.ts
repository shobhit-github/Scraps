import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
