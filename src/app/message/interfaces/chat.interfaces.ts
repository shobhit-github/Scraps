export interface IMessageResponse {
    messages: Array<IMessage>;
}

export interface IMessage {
    id: number;
    message: string;
    files: Array<IFileMessageResponse>;
    voices: Array<IFileMessageResponse>;
    user_id: number;
    conversation_id: number;
    created_at: string;
    updated_at: string;
}

export interface IMessageRequest {
    message?: string;
    files: Array<number>;
    voices: Array<number>;
}

export interface IFileMessageResponse {
    url: string;
    name: string;
}
