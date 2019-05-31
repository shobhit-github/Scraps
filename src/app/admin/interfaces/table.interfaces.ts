export enum EStatuses {
    'Waiting for Review',
    'Active',
    'Declined',
    'Deleted',
    'Not Uploaded',
    'Email Not Confirmed',
}

export enum EStatusesSource {
    WaitingForReview,
    Active,
    Declined,
    Deleted,
    NotUploaded,
    EmailNotConfirmed,
}

export interface TableItem {
    id: number;
    dateCreated: string | Date;
    email: string;
    legalName: string;
    attachedDocs: Array<string>;
    status: EStatusesSource;
    referral_link: {
        point: number;
    };
}
