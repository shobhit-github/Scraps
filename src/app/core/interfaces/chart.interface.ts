export interface IChartData {
    id?: string;
    name: string;
    value: number;
    currency?: ICurrency;
    icon?: string;
    color?: string;
}

export interface ICurrency {
    value?: number;
    symbol?: string;
}

export interface IFullChartData {
    name: string;
    series: Array<IChartData>;
}
