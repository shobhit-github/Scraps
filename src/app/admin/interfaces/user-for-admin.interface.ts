import {EStatusesSource} from './table.interfaces';

export interface IUserForAdminResponse {
    data: IUserForAdmin[];
    links: ILinks;
    meta: IMeta;
}

export interface ILinks {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
}

export interface IMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface IUserForAdmin {
    user: IUserForAdminData;
    files?: Array<IUserForAdminFile>;
}

export interface IUserForAdminData {
    created_at: string | Date;
    email: string;
    id: number;
    name: string;
    status: EStatusesSource;
    referral_link: {
        point: number;
    };
}

export interface IUserForAdminFile {
    url: string;
}
