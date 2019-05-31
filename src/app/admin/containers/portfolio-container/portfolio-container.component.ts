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
import {map, withLatestFrom} from 'rxjs/operators';

import {
    AddLocalPortfolio,
    AddOrUpdatePortfolio,
    DeletePortfolio,
    DeletePortfolioLocal,
    LoadPortfolios,
    LoadAllCoins,
    DeleteOpt,
    AddOpt,
} from '../../actions/portfolio.actions';
import {PortfolioComponent} from '../../components/portfolio/portfolio.component';
import {
    fromMatPaginator,
    paginateRows,
} from '../../components/table-ico/table-ico-datasource';
import {
    getPortfolioList,
    getPortfolioMeta,
    getAllCoinList,
} from '../../reducers';
import * as fromStore from '../../reducers/portfolio.reducer';
import {
    IPortfolioAdmin,
    IPortfolioOption,
} from '../../interfaces/portfolio.interface';
import {ICoin} from '../../interfaces/coin.interface';
import {IChartData} from '../../../core/interfaces/chart.interface';
import {OPT_PREFIX} from './prefix';

@Component({
    selector: 'app-portfolio-container',
    templateUrl: './portfolio-container.component.html',
    styleUrls: ['./portfolio-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioContainerComponent implements AfterContentChecked {
    public portfolioList$: Observable<Array<IPortfolioAdmin>>;
    public coinList$: Observable<Array<ICoin>>;

    private loaded = [];
    @ViewChild(PortfolioComponent)
    public table: PortfolioComponent;
    public totalRows$: Observable<number>;

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new LoadAllCoins());
        this.store.dispatch(new LoadPortfolios({limit: 200, page: 1}));
        this.coinList$ = this.store.pipe(select(getAllCoinList));
    }

    ngAfterContentChecked() {
        const pageEvents$: Observable<PageEvent> = fromMatPaginator(
            this.table.paginator,
        );

        this.portfolioList$ = this.store.pipe(
            select(getPortfolioList),
            paginateRows(pageEvents$),
            withLatestFrom(this.coinList$),
            map(([portfolioList, coinList]) => (coinList ? portfolioList : [])),
        );
        this.totalRows$ = this.store.pipe(
            select(getPortfolioMeta),
            map(meta => (!!meta ? meta.total : 0)),
        );
    }

    savePortfolio(data: IPortfolioAdmin) {
        const newData = {...data};

        const filteredOptions: Array<IPortfolioOption> = Object.values(
            data.options,
        );
        newData.options = filteredOptions;
        this.store.dispatch(new AddOrUpdatePortfolio(newData));
    }

    addLocalPortfolio() {
        const tmpId = uniqueId('new_');
        this.store.dispatch(new AddLocalPortfolio(tmpId));
    }

    deletePortfolio(portfolio: IPortfolioAdmin) {
        if (portfolio.isNew) {
            this.store.dispatch(new DeletePortfolioLocal(portfolio));
        } else {
            this.store.dispatch(new DeletePortfolio(portfolio));
        }
    }

    getPage(e: PageEvent) {
        const page = e.pageIndex + 1;
        if (!this.loaded.includes(page)) {
            const limit = e.pageSize;
            this.loaded.push(page);
            this.store.dispatch(
                new LoadPortfolios({
                    page,
                    limit,
                }),
            );
        }
    }

    protected isEmpty(coin: IChartData) {
        return Number(coin.value) > 0;
    }

    removeOpt(data: { portfolio: IPortfolioAdmin; optId: string }) {
        this.store.dispatch(new DeleteOpt(data));
    }

    addOpt(portfolioId) {
        const tmpId = uniqueId(OPT_PREFIX);
        this.store.dispatch(new AddOpt({portfolioId, optId: tmpId}));
    }
}
