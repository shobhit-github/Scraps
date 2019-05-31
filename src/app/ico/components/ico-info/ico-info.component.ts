import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
} from '@angular/core';
import {IIco} from '../../interfaces/ico.interface';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
    selector: 'app-ico-info',
    templateUrl: './ico-info.component.html',
    styleUrls: ['./ico-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoInfoComponent implements OnChanges {
    @Input()
    public ico: IIco;
    public socialLinks: Array<{ icon: SafeHtml; href: string }> = [];

    constructor(private domSanitizer: DomSanitizer) {
    }

    ngOnChanges() {
        if (this.ico) {
            this.socialLinks = Object.entries(this.ico).map(([key, href]) => {
                if (href) {
                    switch (key) {
                        case 'telegram':
                            return {
                                // tslint:disable-next-line:max-line-length
                                icon: this.domSanitizer.bypassSecurityTrustHtml(`<svg width="24" height="21" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M257.685 552.224c-.338-.281-.884-.307-1.82-.025-.65.204-6.421 2.354-11.517 4.426-4.575 1.868-8.293 3.505-8.735 3.71-.494.154-1.56.614-1.612 1.33-.026.461.364.87 1.118 1.203.806.41 4.368 1.586 5.122 1.817.26.87 1.794 5.961 1.872 6.268.104.46.415.717.571.819a.56.56 0 0 0 .442.18c.182-.001.39-.078.572-.206.962-.767 2.626-2.482 3.094-2.968 2.054 1.587 4.29 3.352 4.498 3.557l.026.025c.494.41 1.014.64 1.482.64.156 0 .312-.026.468-.077.546-.179.935-.69 1.065-1.381 0-.026.026-.128.078-.307a368.075 368.075 0 0 0 2.158-9.902c.546-2.738.988-5.424 1.248-6.857.052-.358.104-.64.13-.819.078-.512.13-1.1-.26-1.433M241 563.954l12.786-7.83c.026-.025.08-.05.107-.074.027 0 .027-.025.053-.025.027 0 .027 0 .054-.025-.027.025-.054.1-.107.149l-3.244 2.8c-2.251 1.908-5.2 4.41-7.156 6.046v.024l-.027.025s0 .025-.027.025c0 .025 0 .025-.027.05v.049c-.134 1.388-.375 3.767-.482 4.832v-.025c-.107-.297-1.608-5.03-1.93-6.021" id="a"/></defs><g transform="translate(-234 -552)"><use xlink:href="#a" fill="#eb003e"/></g></svg>`),
                                href,
                            };
                        case 'twitter':
                            return {
                                // tslint:disable-next-line:max-line-length
                                icon: this.domSanitizer.bypassSecurityTrustHtml(`<svg width="25" height="21" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M259 328.486a9.948 9.948 0 0 1-2.946.834 5.284 5.284 0 0 0 2.255-2.933c-.99.608-2.088 1.05-3.257 1.287A5.046 5.046 0 0 0 251.31 326c-2.833 0-5.129 2.374-5.129 5.302 0 .415.045.819.133 1.208-4.263-.222-8.043-2.332-10.572-5.54a5.41 5.41 0 0 0-.695 2.666c0 1.84.906 3.462 2.282 4.413a4.988 4.988 0 0 1-2.323-.664v.067c0 2.569 1.767 4.71 4.114 5.199a5 5 0 0 1-2.317.09c.653 2.106 2.547 3.64 4.791 3.682a10.079 10.079 0 0 1-7.593 2.195 14.17 14.17 0 0 0 7.862 2.382c9.435 0 14.593-8.078 14.593-15.084 0-.23-.004-.46-.014-.687a10.589 10.589 0 0 0 2.559-2.743" id="a2"/></defs><g transform="translate(-234 -326)"><use xlink:href="#a2" fill="#eb003e"/></g></svg>`),
                                href,
                            };
                        case 'facebook':
                            return {
                                // tslint:disable-next-line:max-line-length
                                icon: this.domSanitizer.bypassSecurityTrustHtml(`<svg width="12" height="25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M253 362h-12v25h12z" id="a3"/><path d="M253 370.095h-4.087V367.5c0-.974.668-1.201 1.137-1.201h2.884v-4.284l-3.972-.015c-4.409 0-5.412 3.195-5.412 5.24v2.855H241v4.414h2.55V387h5.363v-12.49h3.62z" id="c"/><clipPath id="b"><use xlink:href="#a3"/></clipPath></defs><g transform="translate(-241 -362)"><g clip-path="url(#b)"><use xlink:href="#c" fill="#eb003e"/></g></g></svg>`),
                                href,
                            };
                        case 'github':
                            return {
                                // tslint:disable-next-line:max-line-length
                                icon: this.domSanitizer.bypassSecurityTrustHtml(`<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M235 426v-24h24v24z" id="a4"/><path d="M247 402c-6.627 0-12 5.507-12 12.306 0 5.438 3.44 10.045 8.207 11.674.6.112.82-.268.82-.595 0-.294-.01-1.066-.016-2.095-3.338.745-4.045-1.65-4.045-1.65-.546-1.42-1.334-1.8-1.334-1.8-1.087-.766.08-.75.08-.75 1.206.086 1.838 1.27 1.838 1.27 1.071 1.88 2.807 1.34 3.493 1.023.107-.793.418-1.34.76-1.645-2.662-.31-5.464-1.366-5.464-6.08 0-1.345.466-2.443 1.232-3.3-.123-.311-.535-1.565.118-3.258 0 0 1.007-.332 3.3 1.26a11.241 11.241 0 0 1 3.006-.413c1.018.005 2.046.139 3.005.412 2.293-1.59 3.295-1.259 3.295-1.259.653 1.693.24 2.947.118 3.258.766.862 1.232 1.96 1.232 3.3 0 4.725-2.808 5.764-5.48 6.07.428.38.814 1.13.814 2.277 0 1.644-.016 2.973-.016 3.375 0 .327.214.712.825.59 4.778-1.624 8.212-6.232 8.212-11.664 0-6.799-5.373-12.306-12-12.306" id="c1"/><clipPath id="b1"><use xlink:href="#a4"/></clipPath></defs><g transform="translate(-235 -402)"><g clip-path="url(#b1)"><use xlink:href="#c1" fill="#eb003e"/></g></g></svg>`),
                                href,
                            };
                        case 'bitcointalk':
                            return {
                                // tslint:disable-next-line:max-line-length
                                icon: this.domSanitizer.bypassSecurityTrustHtml(`<svg width="18" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M246.706 537h8.706v-24H238v24z" id="a5"/><path d="M254.842 526.722c.377.653.569 1.38.57 2.182 0 .958-.286 1.838-.866 2.646-.578.806-1.394 1.423-2.451 1.847-.546.215-1.234.382-2.048.486V537l-2.525-.426v-2.543l-.06.002h-1.57V537l-2.525-.477v-2.49H238v-2.504h.71c.475 0 .796-.041.967-.12a.747.747 0 0 0 .356-.35c.068-.153.102-.495.102-1.017V519.97c0-.536-.032-.877-.102-1.025a.787.787 0 0 0-.356-.349c-.172-.082-.492-.126-.967-.126H238v-2.503h5.367V513l2.527.315v2.652h1.627V513l2.527.415v2.66c.744.088 1.39.232 1.911.445.895.365 1.584.894 2.069 1.577.481.687.723 1.441.723 2.259 0 .598-.13 1.163-.382 1.699a4.229 4.229 0 0 1-1.106 1.416c-.482.414-1.114.749-1.9 1.02.846.214 1.491.45 1.937.71.65.36 1.162.868 1.542 1.521zm-10.24-7.839v4.413h1.983c1.037 0 1.805-.084 2.301-.26.497-.17.87-.432 1.122-.782.252-.353.378-.755.378-1.217 0-.473-.121-.88-.36-1.222-.235-.332-.578-.573-1.028-.717-.452-.143-1.254-.215-2.412-.215zm5.593 11.16c.353-.451.529-.99.526-1.615 0-.536-.122-.989-.375-1.361-.248-.371-.624-.653-1.122-.842-.498-.189-1.26-.285-2.288-.285h-2.333v3.907c.007.557.026.878.063.975a.423.423 0 0 0 .214.252c.099.048.368.071.808.071h1.318c.766 0 1.403-.073 1.905-.217.504-.143.93-.436 1.284-.885z" id="c2"/><clipPath id="b2"><use xlink:href="#a5"/></clipPath></defs><g transform="translate(-238 -513)"><g clip-path="url(#b2)"><use xlink:href="#c2" fill="#eb003e"/></g></g></svg>`),
                                href,
                            };
                    }
                }
            }).filter(item => !!item);
        }
    }
}
