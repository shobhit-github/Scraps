import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
    UPDATE,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {localStorageSync} from 'ngrx-store-localstorage';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from '../core/reducers/layout.reducer';
import * as fromUser from '../core/reducers/user.reducer';
import {AuthActionTypes} from '../auth/actions/auth.actions';
import {version} from '../../version';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    layout: fromLayout.State;
    user: fromUser.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    user: fromUser.reducer,
};

export function logout(reducer) {
    return function (state, action) {
        if (action.type === AuthActionTypes.logout) {
            localStorage.clear();
            addVersion();
            return reducer(
                undefined,
                action,
            );
        }
        return reducer(
            state,
            action,
        );
    };
}

export function addVersion() {
    localStorage.setItem('version', version);
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        if (action.type !== UPDATE) {
            console.log('state', state);
            console.log('action', action);
        }

        return reducer(state, action);
    };
}

export function localStorageSyncReducer(
    reducer: ActionReducer<any>,
): ActionReducer<any> {
    return localStorageSync({
        keys: ['authContainer', 'layout', 'admin', 'user', 'settings', 'risk', 'yodlee'],
        removeOnUndefined: true,
        rehydrate: true,
    })(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logout, logger, storeFreeze, localStorageSyncReducer]
    : [localStorageSyncReducer, logout];
// export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

/**
 * Layout Selectors
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav,
);

/**
 * User Selectors
 */
export const getUserState = createFeatureSelector<fromUser.State>('user');
