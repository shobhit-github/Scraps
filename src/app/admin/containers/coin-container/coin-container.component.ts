import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    ViewChild,
} from '@angular/core';
import {PageEvent} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {uniqueId} from 'lodash';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {
    AddLocalCoin,
    AddOrUpdateCoin,
    DeleteCoin,
    DeleteCoinLocal,
    LoadCoins,
} from '../../actions/coin.actions';
import {CoinComponent} from '../../components/coin/coin.component';
import {
    fromMatPaginator,
    paginateRows,
} from '../../components/table-ico/table-ico-datasource';
import {ICoin} from '../../interfaces/coin.interface';
import {getCoinList, getCoinMeta} from '../../reducers';
import * as fromStore from '../../reducers/coin.reducer';

@Component({
    selector: 'app-coin-container',
    templateUrl: './coin-container.component.html',
    styleUrls: ['./coin-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinContainerComponent implements AfterContentChecked {
    public coinList$: Observable<Array<ICoin>>;

    private loaded = [];
    @ViewChild(CoinComponent)
    public table: CoinComponent;
    public totalRows$: Observable<number>;

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new LoadCoins({limit: 200, page: 1}));
    }

    ngAfterContentChecked() {
        const pageEvents$: Observable<PageEvent> = fromMatPaginator(
            this.table.paginator,
        );

        this.coinList$ = this.store.pipe(
            select(getCoinList),
            paginateRows(pageEvents$),
        );
        this.totalRows$ = this.store.pipe(
            select(getCoinMeta),
            map(meta => (!!meta ? meta.total : 0)),
        );
    }

    saveCoin(data: FormData) {
        this.store.dispatch(new AddOrUpdateCoin(data));
    }

    addLocalCoin() {
        const tmpId = uniqueId('new_');
        this.store.dispatch(new AddLocalCoin(tmpId));
    }

    deleteCoin(coin: ICoin) {
        if (coin.isNew) {
            this.store.dispatch(new DeleteCoinLocal(coin));
        } else {
            this.store.dispatch(new DeleteCoin(coin));
        }
    }

    getPage(e: PageEvent) {
        const page = e.pageIndex + 1;
        if (!this.loaded.includes(page)) {
            const limit = e.pageSize;
            this.loaded.push(page);
            this.store.dispatch(
                new LoadCoins({
                    page,
                    limit,
                }),
            );
        }
    }
}
