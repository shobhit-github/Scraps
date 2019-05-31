import {
    ActionReducerMap,
    MetaReducer,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {IIco} from '../interfaces/ico.interface';
import * as fromDetail from './detail.reducer';
import * as fromList from './list.reducer';

export interface State {
    list: fromList.State;
    detail: fromDetail.State;
}

export const reducers: ActionReducerMap<State> = {
    list: fromList.reducer,
    detail: fromDetail.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const getIcoState = createFeatureSelector('ico');
export const getListState = createSelector(
    getIcoState,
    (state: State) => state.list,
);
export const getDetailState = createSelector(
    getIcoState,
    (state: State) => state.detail,
);
export const getIcoList = createSelector(
    getListState,
    (state: fromList.State) => state.icos,
);
export const getPage = createSelector(
    getListState,
    (state: fromList.State) => state.page,
);
export const getCount = createSelector(
    getListState,
    (state: fromList.State) => state.count,
);
export const getIco = createSelector(
    getDetailState,
    (state: fromDetail.State) => state.ico,
);
// export function normalizeIco(icoList: Array<IIco>): { [key: string]: IIco } {
//   const normIco: { [key: string]: IIco } = icoList.reduce(
//     (memo, pair) => ({
//       ...memo,
//       [pair.id]: pair,
//     }),
//     {},
//   );
//   return normIco;
// }
