export interface IChangePasswordRequest {
    password: string;
    password_confirmation: string;
    token?: string;
    user_id?: number;
}
