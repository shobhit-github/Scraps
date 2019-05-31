import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from '@ngrx/store';
import * as fromMessage from './message.reducer';
import * as fromVoice from './voice.reducer';

export interface State {
    message: fromMessage.State;
    voice: fromVoice.State;
}

export const reducers: ActionReducerMap<State> = {
    message: fromMessage.reducer,
    voice: fromVoice.reducer,
};

export const selectMessageState = createFeatureSelector<State>('message');
export const selectVoice = createSelector(
    selectMessageState,
    (state: State) => state.voice,
);
export const getVoiceIdList = createSelector(
    selectVoice,
    (state: fromVoice.State) => state.voiceIdList,
);
export const getVoicePreviewList = createSelector(
    selectVoice,
    (state: fromVoice.State) => state.previewList,
);
export const getVoiceStatus = createSelector(
    selectVoice,
    (state: fromVoice.State) => state.inProgress,
);
export const selectMessage = createSelector(
    selectMessageState,
    (state: State) => state.message,
);

export const getDialogList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.dialogList,
);
export const getQuery = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.searchQuery,
);
export const getFilterDialogList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.filterDialogList,
);
export const getMessageList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.messageList,
);
export const getMid = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.mid,
);
export const getSelectedDialog = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.selectedDialog,
);
export const getFileList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.fileList,
);
export const getFileStatusList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.fileStatusList,
);
export const getMenuStatus = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.mobileMenuActive,
);
export const getFileIdList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.fileIdList,
);
export const getUserList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.userList,
);
export const getCurrentSearchUser = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.currentSearchUser,
);

export const getFilePreviewList = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.filePreviewList,
);

export const getSuccessSend = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.successSend,
);
export const getFailedSend = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.failedSend,
);
export const getPending = createSelector(
    selectMessage,
    (state: fromMessage.State) => state.pending,
);
