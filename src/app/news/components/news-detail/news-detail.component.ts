import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
} from '@angular/core';
import {INewsItem} from '../../interfaces/news.interface';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailComponent implements OnInit, OnChanges {
    @Input()
    public article: INewsItem;
    public display = {
        image: false,
        title: false,
    };

    constructor() {
    }

    ngOnInit() {
        this.setVisible(this.article);
    }

    ngOnChanges() {
        this.setVisible(this.article);
    }

    private setVisible(article: INewsItem): void {
        if (article && typeof article.content === 'string') {
            this.display.title = !article.content.includes(article.title);
            this.display.image = !article.content.includes(article.img_src);
        }
    }
}
