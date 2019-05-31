import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {SafeUrl} from '../../../../../node_modules/@angular/platform-browser';

@Component({
    selector: 'app-voice-preview',
    templateUrl: './voice-preview.component.html',
    styleUrls: ['./voice-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoicePreviewComponent implements OnInit {
    @Input() public index: number;
    @Input() public preview: Array<SafeUrl>;
    @Output() public OnRemove = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }
}
