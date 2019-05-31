import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import {IYodleeCreds} from '../../reducers/yodlee.reducer';
import {getFormTpl} from './form';

@Component({
    selector: 'app-yodlee',
    templateUrl: './yodlee.component.html',
    styleUrls: ['./yodlee.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YodleeComponent implements OnInit {
    @Output()
    public connect = new EventEmitter<IYodleeCreds>();
    @Output()
    public opened = new EventEmitter<undefined>();
    @Input()
    public creds: IYodleeCreds;
    @Input()
    public form: string;

    constructor(@Inject('window') public window: Window) {
    }

    ngOnInit() {
        // this.connect.emit(this.creds);
    }

    openModal() {
        const modalWin = this.getNewWindow(900, 600);
        modalWin.document.write(getFormTpl(this.creds));
        this.opened.emit();
        // modalWin.onbeforeunload = () => {
        //   console.log('closed');
        // };
    }

    getNewWindow(w, h): Window {
        // https://stackoverflow.com/a/16861050
        const dualScreenLeft =
            window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop =
            window.screenTop !== undefined ? window.screenTop : window.screenY;
        const width = this.window.innerWidth
            ? this.window.innerWidth
            : document.documentElement.clientWidth
                ? document.documentElement.clientWidth
                : screen.width;
        const height = this.window.innerHeight
            ? this.window.innerHeight
            : document.documentElement.clientHeight
                ? document.documentElement.clientHeight
                : screen.height;

        const left = width / 2 - w / 2 + dualScreenLeft;
        const top = height / 2 - h / 2 + dualScreenTop;
        return this.window.open(
            'about:blank',
            '_blank',
            `width=${w},height=${h},top=${top},left=${left}`,
            false,
        );
    }
}
