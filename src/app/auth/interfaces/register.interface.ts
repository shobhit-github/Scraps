export interface IRegisterInfo {
    email: string;
    password: string;
    password_confirmation: string;
    agreement: boolean | string;
    name: string;
    ref?: string;
}
