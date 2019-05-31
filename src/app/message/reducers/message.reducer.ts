import {Action} from '@ngrx/store';
import {MessageActions, MessageActionTypes} from '../actions/message.actions';
import {
    IDialogListItem,
    IDialogUser,
} from '../interfaces/dialog-list.intefaces';
import {IMessage} from '../interfaces/chat.interfaces';
import {IFilePreview} from '../components/add-file/add-file.component';
import {messageList} from '../containers/message-page/data';
import {VoiceActionTypes, VoiceActions} from '../actions/voice.actions';

export interface State {
    dialogList: Array<IDialogListItem>;
    filterDialogList: Array<IDialogListItem>;
    messageList?: Array<IMessage>;
    selectedDialog?: IDialogListItem;
    fileList?: Array<File>;
    filePreviewList: Array<IFilePreview>;
    successSend: boolean;
    failedSend: boolean;
    pending: boolean;
    mobileMenuActive: boolean;
    fileIdList: Array<number>;
    fileStatusList?: Array<'pending' | 'done' | 'error'>;
    userList: Array<IDialogUser>;
    currentSearchUser?: IDialogUser;
    mid?: number;
    isLocalQuery: boolean;
    searchQuery?: string;
}

export const initialState: State = {
    dialogList: [],
    filterDialogList: [],
    filePreviewList: [],
    fileList: [],
    fileIdList: [],
    userList: [],
    successSend: false,
    failedSend: false,
    pending: false,
    mobileMenuActive: true,
    isLocalQuery: false,
};

export function reducer(
    state = initialState,
    action: MessageActions | VoiceActions,
): State {
    switch (action.type) {
        case VoiceActionTypes.AddVoice:
            return {
                ...state,
                pending: true,
            };
        case VoiceActionTypes.SuccessUploadVoice:
            return {
                ...state,
                pending: false,
            };
        case VoiceActionTypes.FailedUploadVoice:
            return {
                ...state,
                pending: false,
            };
        case MessageActionTypes.SuccessLoadMessages:
            let messageListResult = [];
            if (!action.reset) {
                if (action.dir === 'down') {
                    messageListResult = [...state.messageList, ...action.messageList];
                } else {
                    messageListResult = [...action.messageList, ...state.messageList];
                }
            } else {
                messageListResult = action.messageList;
            }
            if (action.dir === 'down') {
                messageListResult = [
                    ...(action.addToArr ? action.addToArr : []),
                    ...messageListResult,
                ];
            } else {
                messageListResult = [
                    ...messageListResult,
                    ...(action.addToArr ? action.addToArr : []),
                ];
            }
            const uniq = new Map();
            messageListResult.forEach(item => uniq.set(Number(item.id), item));
            messageListResult = Array.from(uniq.values()).sort(
                (a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0),
            );
            // console.log(messageListResult);
            return {
                ...state,
                // TODO: fulltext
                // action.reset
                // ? action.messageList
                // :

                messageList: messageListResult.map(item => {
                    const newItem = {...item};
                    newItem.id = Number(item.id);
                    return newItem;
                }),
                mid: action.messageList[0] ? action.messageList[0].id : undefined,
            };
        case MessageActionTypes.OpenMobile:
            return {
                ...state,
                mobileMenuActive: true,
            };
        case MessageActionTypes.CloseMobile:
            return {
                ...state,
                mobileMenuActive: false,
            };
        case MessageActionTypes.SuccessLoadDialogs:
            return {...state, dialogList: action.dialogList};
        case MessageActionTypes.LoadAndChangeDialog:
            return {
                ...state,
                selectedDialog: undefined,
                currentSearchUser: undefined,
                messageList: [],
                mobileMenuActive: false,
            };
        case MessageActionTypes.SuccessLoadAndChangeDialog:
            return {
                ...state,
                dialogList: action.dialogList,
                selectedDialog: action.dialogList.find(
                    item => item.conversation_id === action.conversation_id,
                ),
            };
        case MessageActionTypes.SuccessUploadFile:
            return {
                ...state,
                pending: false,
                fileIdList: state.fileIdList.map((item, i) => {
                    return i === action.index ? action.fileId : item;
                }),
                fileStatusList: state.fileStatusList.map(
                    (item, i) => (i === action.index ? 'done' : item),
                ),
            };
        case MessageActionTypes.FailedUploadFile:
            return {
                ...state,
                pending: false,
                fileStatusList: state.fileStatusList.map(
                    (item, i) => (i === action.index ? 'error' : item),
                ),
            };
        case MessageActionTypes.RemoveFile:
            return {
                ...state,
                fileStatusList: state.fileStatusList.filter(
                    (item, i) => i !== action.fileIndex,
                ),
                fileList: state.fileList.filter((item, i) => i !== action.fileIndex),
                filePreviewList: state.filePreviewList.filter(
                    (item, i) => i !== action.fileIndex,
                ),
            };
        case MessageActionTypes.UploadFile:
            return {
                ...state,
                fileList: [...state.fileList, action.file],
                pending: true,
                fileStatusList: new Array(state.fileList.length + 1).fill('pending'),
                fileIdList: new Array(state.fileList.length + 1).fill(0),
            };
        case MessageActionTypes.SuccessPreviewFiles:
            return {
                ...state,
                filePreviewList: [...state.filePreviewList, action.preview],
            };
        case MessageActionTypes.ChangeDialog:
            return {
                ...state,
                selectedDialog: action.dialog,
                currentSearchUser: undefined,
                messageList: [],
                mobileMenuActive: false,
            };
        case MessageActionTypes.ResetFiles:
            return {
                ...state,
                fileIdList: [],
                filePreviewList: [],
                fileStatusList: [],
            };
        case MessageActionTypes.SendMessage:
            return {...state, successSend: false, failedSend: false, pending: true};
        case MessageActionTypes.SuccessSendMessage:
            return {
                ...state,
                successSend: true,
                failedSend: false,
                pending: false,
                // currentSearchUser: state.dialogList.filter(
                //   item => item.conversation_id === action.conversation_id,
                // )[0]
                //   ? undefined
                //   : state.currentSearchUser,
                // selectedDialog: state.dialogList.filter(
                //   item => item.conversation_id === action.conversation_id,
                // )[0],
            };
        case MessageActionTypes.FailedSendMessage:
            return {...state, successSend: false, failedSend: true, pending: false};
        case MessageActionTypes.SuccessSearchUser:
            return {...state, userList: action.userList};
        case MessageActionTypes.SelectUser:
            return {
                ...state,
                selectedDialog: undefined,
                currentSearchUser: action.user,
                messageList: undefined,
            };
        case MessageActionTypes.AddMessage:
            return {
                ...state,
                messageList: [...state.messageList, action.message],
            };
        case MessageActionTypes.SearchDialog:
            const resultList = state.dialogList.filter(item =>
                item.user.name.toLowerCase().includes(action.query.toLowerCase()),
            );
            return {
                ...state,
                isLocalQuery: resultList.length > 0,
                filterDialogList: resultList.length < 1 ? state.dialogList : resultList,
                searchQuery: action.query,
            };
        case MessageActionTypes.SuccessSearchDialog:
            return {
                ...state,
                filterDialogList: state.isLocalQuery
                    ? [...state.filterDialogList, ...action.payload]
                    : action.payload,
                isLocalQuery: false,
            };
        default:
            return state;
    }
}
