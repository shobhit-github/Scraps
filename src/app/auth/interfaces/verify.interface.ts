export interface IVerifyPhoneRequest {
    phone: string;
}

export interface IVerifyCodeRequest {
    code: string;
}

export interface ICountry {
    name: string;
    iso2: string;
    dialCode: number;
    format: string;
    hasAreaCodes: boolean;
}
