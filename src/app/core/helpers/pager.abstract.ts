import {Input, OnChanges} from '@angular/core';

export abstract class APager implements OnChanges {
    static metaData = {
        inputs: ['activePage', 'count', 'type'],
    };
    @Input()
    public activePage: number;
    @Input()
    public count: number;
    @Input()
    public type: string;
    public pageList: Array<number> = [];
    public dots: number;

    protected calcPages() {
        this.pageList = [];
        this.dots = 0;
        const n = this.activePage;
        if (this.count <= 3) {
            this.pageList = Array.from({length: this.count}, (v, k) => k + 1);
        } else {
            switch (this.activePage) {
                case 1:
                    this.pageList = [n, n + 1, n + 2].filter(
                        i => i > 0 && i <= this.count,
                    );
                    break;
                case this.count:
                    this.pageList = [n - 2, n - 1, n].filter(
                        i => i > 0 && i <= this.count,
                    );
                    break;
                default:
                    this.pageList = [n - 1, n, n + 1].filter(
                        i => i > 0 && i <= this.count,
                    );
            }
        }
        if (n + 10 < this.count) {
            this.dots = n + 10;
        }
    }

    ngOnChanges() {
        this.calcPages();
    }
}
