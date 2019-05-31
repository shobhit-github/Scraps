import {SafeHtml} from '@angular/platform-browser';

export interface INewsItem {
    title: string;
    link: string;
    pub_date: string;
    description: string | any;
    img_src: string;
    type: string;
    category: string;
    content?: string;
    slug: string;
}

// title: 'Major Korean Crypto Exchange: $31 Million Vanishes';
// link: 'https://news.bitcoin.com/korean-major-crypto-exchange-hacked-us-31-5-million-gone/';
// pub_date: '2018-06-20 06:20:45';
// tslint:disable-next-line:max-line-length
// description: 'Bithumb, South Korea&#8217;s largest crypto exchange announced on its website that between Tuesday evening and Wednesday morning, Korean time, 35 billion won (about 31.5 million USD) worth of cryptocurrencies vanished. Just a few hours later, the announcement was taken down, along with promises of compensation. At press time, it appears Twitter announcements of the heist [&#8230;]The post Major Korean Crypto Exchange: $31 Million Vanishes appeared first on Bitcoin News.';
// img_src: 'https://images.cryptocompare.com/news/bitcoin.com/eioM60o20gw.jpeg';
// type: 'bitcoin-news';

export interface IPagination {
    limit: number;
    page: number;
    source: string;
}
