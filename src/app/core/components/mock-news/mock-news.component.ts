import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
    selector: 'app-mock-news',
    templateUrl: './mock-news.component.html',
    styleUrls: ['./mock-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockNewsComponent implements OnInit {
    constructor(public title: Title, public meta: Meta) {
    }

    ngOnInit() {
    }
}
