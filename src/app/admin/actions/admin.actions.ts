import {Action} from '@ngrx/store';
import {ILoginRequest} from '../../auth/interfaces/login.interface';
import {
    IMeta,
    ILinks,
} from '../interfaces/user-for-admin.interface';
import {
    TableItem,
    EStatusesSource,
} from '../interfaces/table.interfaces';
import {INewsAdmin} from '../interfaces/table-news.interface';
import {Sort} from '@angular/material';

export enum AdminActionTypes {
    LoadAdmins = '[Admin] Load Admins',
    LoadUsers = '[Admin] Load users',
    SearchUsers = '[Admin] Search users',
    LoadUsersSuccess = '[Admin] Loaded users success',
    LoadUsersFailed = '[Admin] Loaded users failed',
    Login = '[Admin] User login',
    Success = '[Admin] User login success',
    Fail = '[Admin] User login fail',
    Update = '[Admin] User update',
    LoadNewsCats = '[Admin] Loading news categories',
    LoadNewsCatsSuccess = '[Admin] Loaded news categories success',
    ResetNewsCats = '[Admin] Reset news categories',
    UpdateCat = '[Admin] Update category',
    DownloadFile = '[Admin] Download file',
}

export class Admin implements Action {
    readonly type = AdminActionTypes.LoadAdmins;
}

export class LoadUsers implements Action {
    readonly type = AdminActionTypes.LoadUsers;

    constructor(
        public payload: {
            limit: number;
            page: number;
            sort?: Sort;
        },
    ) {
    }
}

export class SearchUsers implements Action {
    readonly type = AdminActionTypes.SearchUsers;

    constructor(
        public payload: {
            limit: number;
            page: number;
            sort?: Sort;
            q?: string;
        },
    ) {
    }
}

export class LoadUsersSuccess implements Action {
    readonly type = AdminActionTypes.LoadUsersSuccess;

    constructor(
        public payload: { users: TableItem[]; meta: IMeta; links: ILinks },
    ) {
    }
}

export class LoadUsersFailed implements Action {
    readonly type = AdminActionTypes.LoadUsersFailed;
}

export class Login implements Action {
    readonly type = AdminActionTypes.Login;

    constructor(public payload: ILoginRequest) {
    }
}

export class Success implements Action {
    readonly type = AdminActionTypes.Success;
}

export class Fail implements Action {
    readonly type = AdminActionTypes.Fail;
}

export class Update implements Action {
    readonly type = AdminActionTypes.Update;

    constructor(public payload: { status: EStatusesSource; userId: string }) {
    }
}

export class UpdateCat implements Action {
    readonly type = AdminActionTypes.UpdateCat;

    constructor(public payload: FormData) {
    }
}

export class LoadNewsCats implements Action {
    readonly type = AdminActionTypes.LoadNewsCats;
}

export class LoadNewsCatsSuccess implements Action {
    readonly type = AdminActionTypes.LoadNewsCatsSuccess;

    constructor(public payload: Array<INewsAdmin>) {
    }
}

export class ResetNewsCats implements Action {
    readonly type = AdminActionTypes.ResetNewsCats;
}

export class DownloadFile implements Action {
    readonly type = AdminActionTypes.DownloadFile;

    constructor(public payload: { type: string }) {
    }
}

export type AdminActions =
    | UpdateCat
    | LoadNewsCats
    | LoadNewsCatsSuccess
    | ResetNewsCats
    | Admin
    | Login
    | Success
    | Fail
    | Update
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFailed
    | DownloadFile
    | SearchUsers
    ;
