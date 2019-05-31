import {
    Component,
    OnChanges,
    ChangeDetectionStrategy,
    Input,
    HostListener,
    ViewChild,
    ElementRef,
    SimpleChanges,
} from '@angular/core';
import {IIco} from '../../interfaces/ico.interface';
import {
    trigger,
    animate,
    transition,
    style,
    query,
} from '@angular/animations';
import {faTelegram} from '@fortawesome/free-brands-svg-icons/faTelegram';
import {faTwitterSquare} from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faBitcoin} from '@fortawesome/free-brands-svg-icons/faBitcoin';

@Component({
    selector: 'app-ico-header',
    templateUrl: './ico-header.component.html',
    styleUrls: ['../../styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeAnimation', [
            transition('* => *', [
                query(':enter', [style({opacity: 0})], {optional: true}),

                query(
                    ':leave',
                    [style({opacity: 1}), animate('0.2s', style({opacity: 0}))],
                    {optional: true},
                ),

                query(
                    ':enter',
                    [style({opacity: 0}), animate('0.2s', style({opacity: 1}))],
                    {optional: true},
                ),
            ]),
        ]),
    ],
})
export class IcoHeaderComponent implements OnChanges {
    @Input()
    public ico: IIco;
    public shareActive = false;
    public socialLinks: Array<{ icon: any; href: string }> = [];
    @ViewChild('share')
    public shareRef: ElementRef;
    @ViewChild('toggler')
    public togglerRef: ElementRef;

    constructor() {
    }

    ngOnChanges(sch: SimpleChanges) {
        if (this.ico) {
            this.socialLinks = Object.entries(this.ico)
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
    }

    toggleShare() {
        this.shareActive = !this.shareActive;
    }

    @HostListener('document:click', ['$event.target'])
    onClickedOutside(target) {
        if (
            this.shareRef &&
            this.togglerRef &&
            !this.shareRef.nativeElement.contains(target) &&
            !this.togglerRef.nativeElement.contains(target) &&
            this.shareActive
        ) {
            this.toggleShare();
        }
    }
}
