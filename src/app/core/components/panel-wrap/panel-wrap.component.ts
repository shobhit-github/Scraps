import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
} from '@angular/core';

@Component({
    selector: 'app-panel-wrap',
    templateUrl: './panel-wrap.component.html',
    styleUrls: ['./panel-wrap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelWrapComponent implements OnInit, OnChanges {
    private readonly defaultClasses = {
        main: 'panel',
        header: 'panel__header',
        body: 'panel__body',
        title: 'panel__title',
    };
    @Input()
    public title: string;
    @Input()
    public classes: {
        main: string;
        header: string;
        body: string;
        title: string;
    } = this.defaultClasses;

    constructor() {
    }

    private mergeClasses() {
        this.classes = {...this.defaultClasses, ...this.classes};
    }

    ngOnInit() {
        this.mergeClasses();
    }

    ngOnChanges() {
        this.mergeClasses();
    }
}
