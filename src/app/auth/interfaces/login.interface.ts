import {EStatuses} from '../../admin/interfaces/table.interfaces';

export interface ILoginResponse {
    access_token?: string;
    token_type?: 'bearer' | string;
    expires_in?: number;
    name?: string;
    avatar?: string;
    email?: string;
    two_factor_auth: 0 | 1;
    user_id: number;
    status?: EStatuses;
}

export interface ILoginRequest {
    email: string;
    password: string;
}
