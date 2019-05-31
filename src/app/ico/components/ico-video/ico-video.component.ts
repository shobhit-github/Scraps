import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-ico-video',
    templateUrl: './ico-video.component.html',
    styleUrls: ['./ico-video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoVideoComponent implements OnInit {
    @Input()
    public set videoId(id) {
        this.videoLink = this.domSanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${id}?rel=0&amp;controls=0&amp;showinfo=0`,
        );
    }

    public videoLink: SafeResourceUrl;

    constructor(private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }
}
