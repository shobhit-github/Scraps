import {SafeUrl} from '@angular/platform-browser';

export interface IProfileSettings {
    id: number;
    user_id: number;
    avatar: string | null | SafeUrl;
    nickname: string | null;
}
