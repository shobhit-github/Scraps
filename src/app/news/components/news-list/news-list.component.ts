import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';
import {INewsItem} from '../../interfaces/news.interface';
import {ICatItem} from '../../interfaces/cat.interface';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent implements OnInit, OnChanges {
    @Input() public list: Array<INewsItem>;
    @Input() public title: string;
    @Input() public activeCat: ICatItem;
    @Input() public count = 5;
    @Input() public root = false;
    @Input() public subpage = false;
    @Output() public OnScrollDown = new EventEmitter<string>();
    public lists = [];

    constructor() {
    }

    ngOnInit() {
        if (this.list) {
            this.lists = this.sort(this.chunk(this.list, this.count));
        } else {
            this.lists = [];
        }
    }

    ngOnChanges() {
        if (this.list) {
            this.lists = this.sort(this.chunk(this.list, this.count));
        } else {
            this.lists = [];
        }
    }

    onScrollDown() {
        this.OnScrollDown.emit(this.activeCat.slug);
    }

    chunk(arr: Array<any>, count: number): Array<any> {
        const newArr = [];
        for (let i = 0, j = arr.length; i < j; i += count) {
            const arrChunk = arr.slice(i, i + count);
            if (arrChunk) {
                newArr.push(arrChunk);
            }
        }
        return newArr;
    }

    sort(arr: Array<Array<INewsItem>>): Array<Array<INewsItem>> {
        const newArr = [...arr];
        newArr.forEach(el =>
            el.sort((a, b) => {
                if (a.description && !b.description) {
                    return -1;
                } else if (!a.description && b.description) {
                    return 1;
                }
                return 0;
            }),
        );
        return newArr;
    }
}
