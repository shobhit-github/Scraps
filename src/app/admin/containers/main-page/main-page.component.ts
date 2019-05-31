import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Logout} from '../../../auth/actions/auth.actions';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
    constructor(private store: Store<any>) {
    }

    ngOnInit() {
    }

    logout() {
        this.store.dispatch(new Logout());
    }
}
