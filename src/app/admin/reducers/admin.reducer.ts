import {AdminActions, AdminActionTypes} from '../actions/admin.actions';
import {TableItem} from '../interfaces/table.interfaces';
import {ILinks, IMeta} from '../interfaces/user-for-admin.interface';
import {INewsAdmin} from '../interfaces/table-news.interface';
// export interface FormData implements FormData {
//   entries(): Iterator<{}>
// }
export interface State {
    isPending: boolean;
    success?: boolean;
    fail?: boolean;
    isAdmin: boolean;
    users: TableItem[];
    news: INewsAdmin[];
    meta?: IMeta;
    links?: ILinks;
}

export const initialState: State = {
    isPending: false,
    users: [],
    news: [],
    isAdmin: false,
};

export function reducer(state = initialState, action: AdminActions): State {
    switch (action.type) {
        case AdminActionTypes.LoadAdmins:
            return state;
        case AdminActionTypes.Login:
            return {
                ...state,
                isPending: true,
                success: false,
                fail: false,
                isAdmin: false,
            };
        case AdminActionTypes.Success:
            return {
                ...state,
                isPending: false,
                success: true,
                fail: false,
                isAdmin: true,
            };
        case AdminActionTypes.Fail:
            return {
                ...state,
                isPending: false,
                success: false,
                fail: true,
                isAdmin: false,
            };
        case AdminActionTypes.LoadUsersSuccess:
            return {
                ...state,
                users:
                    action.payload.meta.current_page === 1
                        ? action.payload.users
                        : [...state.users, ...action.payload.users],
                meta: action.payload.meta,
                links: action.payload.links,
            };
        case AdminActionTypes.LoadNewsCats:
            return {
                ...state,
                isPending: true,
            };
        case AdminActionTypes.LoadNewsCatsSuccess:
            return {
                ...state,
                news: action.payload,
                isPending: false,
            };
        case AdminActionTypes.UpdateCat:
            return {
                ...state,
                news: state.news.map(cat => {
                    let updateCat = {...cat};
                    if (String(action.payload.get('id')) === String(cat.id)) {
                        updateCat = {
                            ...updateCat,
                            ...Array.from(action.payload.entries()).reduce(
                                (memo, pair) => ({
                                    ...memo,
                                    [pair[0]]: pair[1],
                                }),
                                {},
                            ),
                        };
                    }
                    return updateCat;
                }),
            };
        case AdminActionTypes.Update:
            return {
                ...state,
                users: state.users.map(user => {
                    let updateUser = {...user};
                    if (String(action.payload.userId) === String(user.id)) {
                        updateUser = {...updateUser, status: action.payload.status};
                    }
                    return updateUser;
                }),
            };
        case AdminActionTypes.DownloadFile:
            return {
                ...state,
                isPending: true,
            };

        default:
            return state;
    }
}
