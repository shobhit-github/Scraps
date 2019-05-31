import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    Input,
    EventEmitter,
} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers/yodlee.reducer';
import {LoadForm, LoadYodlee} from '../../actions/yodlee.actions';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-yodlee-container',
    templateUrl: './yodlee-container.component.html',
    styleUrls: ['./yodlee-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YodleeContainerComponent implements OnInit {
    @Output()
    public OnConnected = new EventEmitter<boolean>();
    @Output()
    public opened = new EventEmitter<undefined>();
    @Input()
    isReady: boolean;
    @Input()
    isRegister = false;
    public creds$: Observable<fromStore.IYodleeCreds>;
    public form$: Observable<string>;

    constructor(
        private store: Store<fromStore.State>,
    ) {
        this.store.dispatch(new LoadYodlee());
        this.creds$ = this.store.pipe(select(fromStore.getCreds));
        this.form$ = this.store.pipe(select(fromStore.getForm));
    }

    ngOnInit() {
    }

    connectYodlee(creds: fromStore.IYodleeCreds) {
        // this.store.dispatch(new LoadForm(creds));
    }
}
