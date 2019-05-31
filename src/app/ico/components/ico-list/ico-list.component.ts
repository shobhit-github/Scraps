import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import {IIco} from '../../interfaces/ico.interface';
import {EIcoTypes} from '../../containers/ico-list-container/ico-list-container.component';
import {faTelegram} from '@fortawesome/free-brands-svg-icons/faTelegram';
import {faTwitterSquare} from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faBitcoin} from '@fortawesome/free-brands-svg-icons/faBitcoin';

@Component({
    selector: 'app-ico-list',
    templateUrl: './ico-list.component.html',
    styleUrls: ['../../styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoListComponent implements OnInit, OnChanges {
    @Input()
    public icoList: Array<IIco>;
    public EIcoTypes = EIcoTypes;
    public socialLinks = {};

    constructor() {
    }

    ngOnInit() {
    }

    trackByFn(i: number, item: IIco) {
        return item.id;
    }

    ngOnChanges(sch: SimpleChanges) {
        if (this.icoList) {
            this.icoList.forEach(ico => {
                if (!this.socialLinks[ico.id]) {
                    this.socialLinks[ico.id] = Object.entries(ico)
                        .map(([key, href]) => {
                            if (href) {
                                switch (key) {
                                    case 'telegram':
                                        return {
                                            icon: faTelegram,
                                            href,
                                        };
                                    case 'twitter':
                                        return {
                                            icon: faTwitterSquare,
                                            href,
                                        };
                                    case 'facebook':
                                        return {
                                            icon: faFacebookSquare,
                                            href,
                                        };
                                    // case 'github':
                                    //   return {
                                    //     icon: 'github-square',
                                    //     href,
                                    //   };
                                    case 'bitcointalk':
                                        return {
                                            icon: faBitcoin,
                                            href,
                                        };
                                }
                            }
                        })
                        .filter(item => !!item);
                }
            });
        }
    }
}
