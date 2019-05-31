import {Action} from '@ngrx/store';
import {VoiceActions, VoiceActionTypes} from '../actions/voice.actions';
import {SafeUrl} from '../../../../node_modules/@angular/platform-browser';
import {MessageActionTypes, MessageActions} from '../actions/message.actions';

export interface State {
    previewList: Array<SafeUrl>;
    voiceList: Array<File>;
    voiceIdList: Array<number>;
    inProgress: boolean;
}

export const initialState: State = {
    previewList: [],
    voiceIdList: [],
    voiceList: [],
    inProgress: false,
};

export function reducer(
    state = initialState,
    action: VoiceActions | MessageActions,
): State {
    switch (action.type) {
        case VoiceActionTypes.StartVoice:
            return {
                ...state,
                inProgress: true,
            };
        case VoiceActionTypes.StopVoice:
            return {
                ...state,
                inProgress: false,
            };
        case MessageActionTypes.ResetFiles:
            return {
                ...state,
                previewList: [],
                voiceIdList: [],
                voiceList: [],
            };
        case VoiceActionTypes.NoMicro:
            return {
                ...state,
                previewList: [],
                voiceIdList: [],
                voiceList: [],
                inProgress: false,
            };
        case VoiceActionTypes.AddVoice:
            return {
                ...state,
                previewList: [...state.previewList, action.payload.preview],
                voiceList: [...state.voiceList, action.payload.file],
            };
        case VoiceActionTypes.RemoveVoice:
            return {
                ...state,
                previewList: state.previewList.filter(
                    (item, i) => i !== action.fileIndex,
                ),
                voiceList: state.voiceList.filter((item, i) => i !== action.fileIndex),
                voiceIdList: state.voiceIdList.filter(
                    (item, i) => i !== action.fileIndex,
                ),
            };
        case VoiceActionTypes.SuccessUploadVoice:
            return {
                ...state,
                voiceIdList: [...state.voiceIdList, action.fileId],
            };

        default:
            return state;
    }
}
