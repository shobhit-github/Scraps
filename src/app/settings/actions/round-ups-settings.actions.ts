import {Action} from '@ngrx/store';
import {IStripeCard} from 'src/app/invest/interfaces/stripe-card.interface';

import {State} from '../reducers/round-ups-settings.reducer';
import {ERoundUpsStatus} from '../interfaces/round-ups-settings.interfaces';

export enum RoundUpsSettingsActionTypes {
    Load = '[RoundUpsSettings] Load Round Ups Settings',
    LoadSuccess = '[RoundUpsSettings] Load Round Ups Settings Success',
    LoadFail = '[RoundUpsSettings] Load Round Ups Settings Fail',
    SetCard = '[RoundUpsSettings] Set Card',
    Save = '[RoundUpsSettings] Save',
    SaveSuccess = '[RoundUpsSettings] Save Success',
    SaveFail = '[RoundUpsSettings] Save Fail',
    SetStatus = '[RoundUpsSettings] Set Status',
    SetStatusSuccess = '[RoundUpsSettings] Set Status Success',
    SetStatusFail = '[RoundUpsSettings] Set Status Fail',
}

export class Load implements Action {
    readonly type = RoundUpsSettingsActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = RoundUpsSettingsActionTypes.LoadSuccess;

    constructor(public payload: State) {
    }
}

export class LoadFail implements Action {
    readonly type = RoundUpsSettingsActionTypes.LoadFail;
}

export class SetCard implements Action {
    readonly type = RoundUpsSettingsActionTypes.SetCard;

    constructor(public payload: IStripeCard) {
    }
}

export class SetStatus implements Action {
    readonly type = RoundUpsSettingsActionTypes.SetStatus;

    constructor(public payload: ERoundUpsStatus) {
    }
}

export class SetStatusSuccess implements Action {
    readonly type = RoundUpsSettingsActionTypes.SetStatusSuccess;

    constructor(public payload: ERoundUpsStatus) {
    }
}

export class SetStatusFail implements Action {
    readonly type = RoundUpsSettingsActionTypes.SetStatusFail;
}

export class Save implements Action {
    readonly type = RoundUpsSettingsActionTypes.Save;

    constructor(public payload: IStripeCard) {
    }
}

export class SaveSuccess implements Action {
    readonly type = RoundUpsSettingsActionTypes.SaveSuccess;

    constructor(public payload: IStripeCard) {
    }
}

export class SaveFail implements Action {
    readonly type = RoundUpsSettingsActionTypes.SaveFail;
}

export type RoundUpsSettingsActions =
    | Load
    | LoadSuccess
    | LoadFail
    | SetCard
    | Save
    | SaveSuccess
    | SaveFail
    | SetStatus
    | SetStatusSuccess
    | SetStatusFail;
