import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    Input,
} from '@angular/core';
import * as MediaStreamRecorder from 'msr';
import {
    DomSanitizer,
    SafeUrl,
} from '../../../../../node_modules/@angular/platform-browser';

@Component({
    selector: 'app-voice-record',
    templateUrl: './voice-record.component.html',
    styleUrls: ['./voice-record.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoiceRecordComponent implements OnInit {
    @Output()
    public OnRecord = new EventEmitter<{
        preview: SafeUrl;
        file: File;
    }>();
    @Output()
    public OnStart = new EventEmitter<undefined>();
    @Output()
    public OnNoMicro = new EventEmitter<undefined>();
    @Input()
    public inProgress: boolean;
    public mediaConstraints = {
        audio: true,
    };
    public err: boolean;
    public mediaRecorder: MediaStreamRecorder;
    public stream;

    constructor(
        private domSanitizer: DomSanitizer,
        private cd: ChangeDetectorRef,
    ) {
        // this.startAudio();
    }

    public onMediaSuccess(stream) {
        this.stream = stream;
        this.err = false;
        this.mediaRecorder = new MediaStreamRecorder(stream);
        this.mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
        this.mediaRecorder.ondataavailable = blob => {
            // POST/PUT "Blob" using FormData/XHR2

            const blobURL = URL.createObjectURL(blob);
            const preview = this.domSanitizer.bypassSecurityTrustUrl(blobURL);
            this.OnRecord.emit({preview, file: blob});
        };
        this.mediaRecorder.start(30000);
        // console.log(this.mediaRecorder);

        setTimeout(() => {
            // mediaRecorder.pause();
            this.stopRecord();
        }, 30000);
    }

    public onMediaError(e: DOMException) {
        if (e) {
            this.err = true;
            this.cd.detectChanges();
            this.OnNoMicro.emit();
        }
    }

    stopRecord() {
        this.mediaRecorder.stop();
        this.stream.getAudioTracks().forEach(function (track) {
            track.stop();
        });
        this.cd.detectChanges();
    }

    startAudio() {
        if (!this.inProgress) {
            this.OnStart.emit();
            navigator.getUserMedia(
                this.mediaConstraints,
                this.onMediaSuccess.bind(this),
                this.onMediaError.bind(this),
            );
        } else {
            this.stopRecord();
        }
    }

    ngOnInit() {
    }
}
