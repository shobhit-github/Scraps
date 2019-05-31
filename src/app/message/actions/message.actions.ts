import {Action} from '@ngrx/store';
import {
    IDialogListItem,
    IDialogUser,
} from '../interfaces/dialog-list.intefaces';
import {IMessage, IMessageRequest} from '../interfaces/chat.interfaces';
import {IFilePreview} from '../components/add-file/add-file.component';
import {SafeUrl} from '../../../../node_modules/@angular/platform-browser';

export enum MessageActionTypes {
    LoadMessages = '[Message] Load Messages',
    OpenMobile = '[Message] Open Mobile Menu',
    CloseMobile = '[Message] Close Mobile Menu',
    SuccessLoadMessages = '[Message] Success Load Messages',
    FailedLoadMessages = '[Message] Failed Load Messages',
    LoadDialogs = '[Message] Load Dialogs',
    SuccessLoadDialogs = '[Message] Success Load Dialogs',
    FailedLoadDialogs = '[Message] Failed Load Dialogs',
    LoadAndChangeDialog = '[Message] Load And Change Dialogs',
    SuccessLoadAndChangeDialog = '[Message] Success Load And Change Dialogs',
    FailedLoadAndChangeDialog = '[Message] Failed Load And Change Dialogs',
    SearchDialog = '[Message] Search Dialog',
    SuccessSearchDialog = '[Message] Success Search Dialog',
    FailedSearchDialog = '[Message] Failed Search Dialog',
    ChangeDialog = '[Message] Change Active Dialog',
    UploadFile = '[Message] Upload Files',
    SuccessUploadFile = '[Message] Success Upload Files',
    FailedUploadFile = '[Message] Failed Upload Files',
    PreviewFiles = '[Message] Preview Files',
    SuccessPreviewFiles = '[Message] Success Preview Files',
    FailedPreviewFiles = '[Message] Failed Preview Files',
    SendMessage = '[Message] Send Message',
    SuccessSendMessage = '[Message] Success Send Message',
    FailedSendMessage = '[Message] Failed Send Message',
    SendNewMessage = '[Message] Send New Message',
    SuccessSendNewMessage = '[Message] Success Send New Message',
    FailedSendNewMessage = '[Message] Failed Send New Message',
    SearchUser = '[Message] Search User',
    SuccessSearchUser = '[Message] Success Search User',
    FailedSearchUser = '[Message] Failed Search User',
    RemoveFile = '[Message] Remove File',

    ResetFiles = '[Message] Reset File',
    SelectUser = '[Message] Select User For Dialog',
    AddMessage = '[Message] Add New Message',
}

export class AddMessage implements Action {
    readonly type = MessageActionTypes.AddMessage;

    constructor(public message: IMessage) {
    }
}

export class LoadMessages implements Action {
    readonly type = MessageActionTypes.LoadMessages;

    constructor(
        public conversation_id: number,
        public mid?: number,
        public reset?: boolean,
        public addToArr?: Array<IMessage>,
        public dir?: 'up' | 'down',
    ) {
    }
}

export class RemoveFile implements Action {
    readonly type = MessageActionTypes.RemoveFile;

    constructor(public fileIndex: number) {
    }
}

export class SuccessLoadMessages implements Action {
    readonly type = MessageActionTypes.SuccessLoadMessages;

    constructor(
        public messageList: Array<IMessage>,
        public reset?: boolean,
        public addToArr?: Array<IMessage>,
        public dir?: 'up' | 'down',
    ) {
    }
}

export class FailedLoadMessages implements Action {
    readonly type = MessageActionTypes.FailedLoadMessages;
}

export class OpenMobile implements Action {
    readonly type = MessageActionTypes.OpenMobile;
}

export class CloseMobile implements Action {
    readonly type = MessageActionTypes.CloseMobile;
}

export class LoadDialogs implements Action {
    readonly type = MessageActionTypes.LoadDialogs;
}

export class SuccessLoadDialogs implements Action {
    readonly type = MessageActionTypes.SuccessLoadDialogs;

    constructor(public dialogList: Array<IDialogListItem>) {
    }
}

export class FailedLoadDialogs implements Action {
    readonly type = MessageActionTypes.FailedLoadDialogs;
}

export class LoadAndChangeDialog implements Action {
    readonly type = MessageActionTypes.LoadAndChangeDialog;

    constructor(public conversation_id: number) {
    }
}

export class SuccessLoadAndChangeDialog implements Action {
    readonly type = MessageActionTypes.SuccessLoadAndChangeDialog;

    constructor(
        public dialogList: Array<IDialogListItem>,
        public conversation_id: number,
    ) {
    }
}

export class FailedLoadAndChangeDialog implements Action {
    readonly type = MessageActionTypes.FailedLoadAndChangeDialog;
}

export class SearchDialog implements Action {
    readonly type = MessageActionTypes.SearchDialog;

    constructor(public query: string) {
    }
}

export class SuccessSearchDialog implements Action {
    readonly type = MessageActionTypes.SuccessSearchDialog;

    constructor(public payload: Array<IDialogListItem>) {
    }
}

export class FailedSearchDialog implements Action {
    readonly type = MessageActionTypes.FailedSearchDialog;
}

export class ChangeDialog implements Action {
    readonly type = MessageActionTypes.ChangeDialog;

    constructor(public dialog: IDialogListItem) {
    }
}

export class UploadFile implements Action {
    readonly type = MessageActionTypes.UploadFile;

    constructor(
        public file: File,
        public index: number /* | FileList | FormData | Array<Blob>*/,
    ) {
    }
}

export class SuccessUploadFile implements Action {
    readonly type = MessageActionTypes.SuccessUploadFile;

    constructor(public fileId: number, public index: number) {
    }
}

export class FailedUploadFile implements Action {
    readonly type = MessageActionTypes.FailedUploadFile;

    constructor(public index: number) {
    }
}

export class SendMessage implements Action {
    readonly type = MessageActionTypes.SendMessage;

    constructor(public message: IMessageRequest, public receiver_id: number) {
    }
}

export class SuccessSendMessage implements Action {
    readonly type = MessageActionTypes.SuccessSendMessage;

    constructor(public conversation_id: number) {
    }
}

export class FailedSendMessage implements Action {
    readonly type = MessageActionTypes.FailedSendMessage;
}

export class SendNewMessage implements Action {
    readonly type = MessageActionTypes.SuccessSendNewMessage;

    constructor(public message: IMessageRequest, public receiver_id: number) {
    }
}

export class SuccessSendNewMessage implements Action {
    readonly type = MessageActionTypes.SuccessSendNewMessage;

    constructor(public conversation_id: number) {
    }
}

export class FailedSendNewMessage implements Action {
    readonly type = MessageActionTypes.FailedSendNewMessage;
}

export class SearchUser implements Action {
    readonly type = MessageActionTypes.SearchUser;

    constructor(public query: string) {
    }
}

export class SuccessSearchUser implements Action {
    readonly type = MessageActionTypes.SuccessSearchUser;

    constructor(public userList: Array<IDialogUser>) {
    }
}

export class FailedSearchUser implements Action {
    readonly type = MessageActionTypes.FailedSearchUser;
}

export class PreviewFiles implements Action {
    readonly type = MessageActionTypes.PreviewFiles;

    constructor(public fileList: Array<File>) {
    }
}

export class SuccessPreviewFiles implements Action {
    readonly type = MessageActionTypes.SuccessPreviewFiles;

    constructor(public preview: IFilePreview) {
    }
}

export class FailedPreviewFiles implements Action {
    readonly type = MessageActionTypes.FailedPreviewFiles;
}

export class ResetFiles implements Action {
    readonly type = MessageActionTypes.ResetFiles;

    constructor(public conversation_id: number) {
    }
}

export class SelectUser implements Action {
    readonly type = MessageActionTypes.SelectUser;

    constructor(public user: IDialogUser) {
    }
}

export type MessageActions =
    | OpenMobile
    | CloseMobile
    | SelectUser
    | LoadMessages
    | SuccessLoadMessages
    | FailedLoadMessages
    | LoadDialogs
    | SuccessLoadDialogs
    | FailedLoadDialogs
    | LoadAndChangeDialog
    | SuccessLoadAndChangeDialog
    | FailedLoadAndChangeDialog
    | SearchDialog
    | SuccessSearchDialog
    | FailedSearchDialog
    | ChangeDialog
    | UploadFile
    | RemoveFile
    | SuccessUploadFile
    | FailedUploadFile
    | SendMessage
    | SuccessSendMessage
    | FailedSendMessage
    | SendNewMessage
    | SuccessSendNewMessage
    | FailedSendNewMessage
    | SearchUser
    | SuccessSearchUser
    | FailedSearchUser
    | PreviewFiles
    | SuccessPreviewFiles
    | FailedPreviewFiles
    | AddMessage
    | ResetFiles;
