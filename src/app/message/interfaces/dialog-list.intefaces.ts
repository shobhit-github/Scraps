import {IMessage} from './chat.interfaces';

// conversation
export interface IDialogListItem {
    conversation_id: number;
    message: string;
    file: string;
    voice: string;
    updated_at: string; // Date
    user: IDialogUser;
    is_seen: boolean;
    filterMessageList?: Array<IMessage>;
}

// conversation user
export interface IDialogUser {
    id: number;
    name: string;
    is_online: boolean;
    avatar?: string;
    followers?: number;
    portfolio_users?: number;
    roi?: number;
}
