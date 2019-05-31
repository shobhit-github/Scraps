import {IMeta} from '../../admin/interfaces/user-for-admin.interface';

export interface IPaginationRequest {
    limit: number;
    page: number;
}

export interface IPaginationResponse<T> {
    data: T;
    meta: IMeta;
}
