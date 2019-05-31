import {Action} from '@ngrx/store';
import {SafeUrl} from '../../../../node_modules/@angular/platform-browser';

export enum VoiceActionTypes {
    NoMicro = '[Message] No Micro',
    UploadVoice = '[Message] Upload Voices',
    SuccessUploadVoice = '[Message] Success Upload Voices',
    FailedUploadVoice = '[Message] Failed Upload Voices',
    AddVoice = '[Message] Add Voice',
    StartVoice = '[Message] Start Voice',
    StopVoice = '[Message] Stop Voice',
    RemoveVoice = '[Message] Remove Voice',
}

export class AddVoice implements Action {
    readonly type = VoiceActionTypes.AddVoice;

    constructor(public payload: { preview: SafeUrl; file: File }) {
    }
}

export class RemoveVoice implements Action {
    readonly type = VoiceActionTypes.RemoveVoice;

    constructor(public fileIndex: number) {
    }
}

export class StartVoice implements Action {
    readonly type = VoiceActionTypes.StartVoice;
}

export class StopVoice implements Action {
    readonly type = VoiceActionTypes.StopVoice;
}

export class NoMicro implements Action {
    readonly type = VoiceActionTypes.NoMicro;
}

export class UploadVoice implements Action {
    readonly type = VoiceActionTypes.UploadVoice;

    constructor(public file: File, public index: number) {
    }
}

export class SuccessUploadVoice implements Action {
    readonly type = VoiceActionTypes.SuccessUploadVoice;

    constructor(public fileId: number, public index: number) {
    }
}

export class FailedUploadVoice implements Action {
    readonly type = VoiceActionTypes.FailedUploadVoice;

    constructor(public index: number) {
    }
}

export type VoiceActions =
    | NoMicro
    | UploadVoice
    | SuccessUploadVoice
    | FailedUploadVoice
    | AddVoice
    | StartVoice
    | StopVoice
    | RemoveVoice;
