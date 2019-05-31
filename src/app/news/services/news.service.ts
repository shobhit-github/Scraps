import {Injectable} from '@angular/core';
import {ICatItem} from '../interfaces/cat.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {INewsItem, IPagination} from '../interfaces/news.interface';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {
    }

    public getCatList(): Observable<Array<ICatItem>> {
        return this.http
            .get(`${environment.baseUrl}/crypto-news/get-crypto-category-list`)
            .pipe(map((response: { data: Array<ICatItem> }) => response.data || []));
    }

    public getNewsList(config: IPagination): Observable<Array<INewsItem>> {
        let url = '';
        if (config && config.source) {
            url = `${environment.baseUrl}/crypto-news/get-article-list`;
        } else {
            url = `${environment.baseUrl}/crypto-news/get-trending-list`;
        }
        return this.http
            .get(url, {
                params: {
                    ...this.prepareConfig(config),
                },
            })
            .pipe(map((response: { data: Array<INewsItem> }) => response.data || []));
    }

    public getArticle(config: {
        source: string;
        slug: string;
    }): Observable<INewsItem> {
        return this.http
            .get(`${environment.baseUrl}/crypto-news/get-article`, {
                params: {
                    ...config,
                },
            })
            .pipe(
                map((response: { data: INewsItem }) => response.data),
                map(article => {
                    // const parser = new DOMParser();
                    // const content = parser.parseFromString(
                    //   article.content,
                    //   'text/html',
                    // );
                    // console.dir(content);
                    // article.content.querySelector('script').remove();
                    // article.content = article.content.querySelector('body').innerHTML;
                    // article.content = this.domSanitizer.bypassSecurityTrustHtml(<string>article.content);
                    // article.content = content.querySelector('body').innerHTML;
                    // if (article.content.includes('innerhtml=')) {
                    //   article.content = `${article.content
                    //     .split('innerhtml="')
                    //     .pop()
                    //     .split('>">')
                    //     .shift()}>`;
                    // }
                    // console.log(article.content);

                    return article;
                }),
            );
    }

    private prepareConfig(config: any) {
        const newConfig = {};
        Object.entries(config).forEach(([key, val]) => {
            newConfig[key] = String(val);
        });

        return newConfig;
    }
}
