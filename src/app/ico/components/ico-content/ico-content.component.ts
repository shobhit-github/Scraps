import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {IIco} from '../../interfaces/ico.interface';

@Component({
    selector: 'app-ico-content',
    templateUrl: './ico-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoContentComponent implements OnInit {
    @Input()
    public ico: IIco;

    constructor() {
    }

    ngOnInit() {
    }
}
