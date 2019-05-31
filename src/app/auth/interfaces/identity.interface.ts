import {EIdentity} from './identity.enum';

export interface IIdentityRequest extends FormData {
    images: Array<File>;
    type: EIdentity;
}
