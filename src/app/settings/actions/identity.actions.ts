import {Action} from '@ngrx/store';
import {IFileMessageResponse} from '../../message/interfaces/chat.interfaces';
import {EStatusesSource} from '../../admin/interfaces/table.interfaces';

export enum IdentityActionTypes {
    LoadIdentity = '[Identity] Load Identity Files',
    SuccessLoadIdentity = '[Identity] Success Load Identity Files',
    FailedLoadIdentity = '[Identity] Failed Load Identity Files',
}

export class LoadIdentity implements Action {
    readonly type = IdentityActionTypes.LoadIdentity;
}

export class SuccessLoadIdentity implements Action {
    readonly type = IdentityActionTypes.SuccessLoadIdentity;

    constructor(
        public payload: {
            images: Array<IFileMessageResponse>;
            status: EStatusesSource;
        },
    ) {
    }
}

export class FailedLoadIdentity implements Action {
    readonly type = IdentityActionTypes.FailedLoadIdentity;
}

export type IdentityActions =
    | LoadIdentity
    | SuccessLoadIdentity
    | FailedLoadIdentity;
