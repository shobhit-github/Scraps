import {Action} from '@ngrx/store';

export enum ReferralActionTypes {
    LoadReferral = '[Referral] Load Referral',
    SuccessLoadReferral = '[Referral] Success Load Referral',
    FailedLoadReferral = '[Referral] Failed Load Referral',
}

export class LoadReferral implements Action {
    readonly type = ReferralActionTypes.LoadReferral;
}

export class SuccessLoadReferral implements Action {
    readonly type = ReferralActionTypes.SuccessLoadReferral;

    constructor(public payload: { link: string }) {
    }
}

export class FailedLoadReferral implements Action {
    readonly type = ReferralActionTypes.FailedLoadReferral;
}

export type ReferralActions =
    | LoadReferral
    | SuccessLoadReferral
    | FailedLoadReferral;
