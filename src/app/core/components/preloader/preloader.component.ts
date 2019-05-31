import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent implements OnInit {
    @Input()
    public height = 'auto';

    constructor() {
    }

    ngOnInit() {
    }
}
