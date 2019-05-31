import {IRoundUpInfo} from '../interfaces/round-up-info.interface';

export class RoundUpInfoAdapter implements IRoundUpInfo {
    public currentSum: number;
    public maxSum: number;
    public totalCount: number;
    public totalAmount: number;

    constructor(info: IOriginRoundUpsInfo) {
        const {
            current_sum: currentSum,
            max_sum: maxSum,
            total_count: totalCount,
            total_amount: totalAmount,
        } = info;
        Object.assign(this, {currentSum, maxSum, totalCount, totalAmount});
    }
}

export interface IOriginRoundUpsInfo {
    current_sum: number;
    max_sum: number;
    total_count: number;
    total_amount: number;
}
