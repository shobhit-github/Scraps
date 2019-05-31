import {Action} from '@ngrx/store';
import {EIdentity} from '../interfaces/identity.enum';
import {IIdentityRequest} from '../interfaces/identity.interface';

export enum IdentityActionTypes {
    loadIdentitys = '[Identity] Load Identitys',
    changeType = '[Identity] Change identity type',
    resetType = '[Identity] Reset identity type',
    upload = '[Identity] Picture uploading',
    uploadSuccess = '[Identity] Picture uploading success',
    uploadFailed = '[Identity] Picture uploading failed',
}

export class Identity implements Action {
    readonly type = IdentityActionTypes.loadIdentitys;
}

export class ChangeType implements Action {
    readonly type = IdentityActionTypes.changeType;

    constructor(public payload: EIdentity) {
    }
}

export class ResetType implements Action {
    readonly type = IdentityActionTypes.resetType;
}

export class Upload implements Action {
    readonly type = IdentityActionTypes.upload;

    constructor(
        public payload: { identityData: Array<FormData>; type: EIdentity },
    ) {
    }
}

export class UploadSuccess implements Action {
    readonly type = IdentityActionTypes.uploadSuccess;
}

export class UploadFailed implements Action {
    readonly type = IdentityActionTypes.uploadFailed;
}

export type IdentityActions =
    | Identity
    | ChangeType
    | ResetType
    | Upload
    | UploadSuccess
    | UploadFailed;
