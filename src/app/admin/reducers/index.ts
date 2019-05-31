import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from '@ngrx/store';

import {environment} from '../../../environments/environment';
import * as fromRoot from '../../reducers';
import * as fromAdmin from './admin.reducer';
import * as fromQuiz from './quiz.reducer';
import * as fromIco from './ico.reducer';
import * as fromCoin from './coin.reducer';
import * as fromPortfolio from './portfolio.reducer';

export interface AdminState {
    login: fromAdmin.State;
    quiz: fromQuiz.State;
    ico: fromIco.State;
    coin: fromCoin.State;
    portfolio: fromPortfolio.State;
}

export interface State extends fromRoot.State {
    admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
    login: fromAdmin.reducer,
    quiz: fromQuiz.reducer,
    ico: fromIco.reducer,
    coin: fromCoin.reducer,
    portfolio: fromPortfolio.reducer,
};

export const metaReducers: MetaReducer<AdminState>[] = !environment.production ? [] : [];
export const selectLogin = createFeatureSelector<AdminState>('admin');
export const selectQuiz = createSelector(
    selectLogin,
    (state: AdminState) => state.quiz,
);
export const selectIco = createSelector(
    selectLogin,
    (state: AdminState) => state.ico,
);
export const selectCoin = createSelector(
    selectLogin,
    (state: AdminState) => state.coin,
);
export const selectPortfolio = createSelector(
    selectLogin,
    (state: AdminState) => state.portfolio,
);
// console.log(selectLogin);

export const selectAdmin = createSelector(
    selectLogin,
    (state: AdminState) => state.login,
);
export const selectUsersState = createSelector(
    selectAdmin,
    (state: fromAdmin.State) => state.users,
);
export const selectUsersMeta = createSelector(
    selectAdmin,
    (state: fromAdmin.State) => state.meta,
);
export const selectSuccess = createSelector(
    selectLogin,
    (state: AdminState) => state.login.success,
);
export const selectFail = createSelector(
    selectLogin,
    (state: AdminState) => state.login.fail,
);
export const selectNewsCatState = createSelector(
    selectLogin,
    (state: AdminState) => state.login.news,
);
export const getQuestions = createSelector(
    selectQuiz,
    (state: fromQuiz.State) => state.questions,
);
export const getIcoList = createSelector(
    selectIco,
    (state: fromIco.State) => state.icos,
);
export const getIcoMeta = createSelector(
    selectIco,
    (state: fromIco.State) => state.meta,
);
export const getCoinList = createSelector(
    selectCoin,
    (state: fromCoin.State) => state.coinList,
);
export const getCoinMeta = createSelector(
    selectCoin,
    (state: fromCoin.State) => state.meta,
);
export const getPortfolioList = createSelector(
    selectPortfolio,
    (state: fromPortfolio.State) => state.portfolioList,
);
export const getPortfolioMeta = createSelector(
    selectPortfolio,
    (state: fromPortfolio.State) => state.meta,
);
export const getAllCoinList = createSelector(
    selectPortfolio,
    (state: fromPortfolio.State) => state.coinList,
);
