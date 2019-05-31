import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';
import {IFilePreview} from '../add-file/add-file.component';

@Component({
    selector: 'app-file-preview',
    templateUrl: './file-preview.component.html',
    styleUrls: ['./file-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class FilePreviewComponent implements OnInit, OnChanges {
    @Input() public preview: IFilePreview;
    @Input() public failed: boolean;
    @Input() public fileStatusList: Array<'done' | 'pending' | 'error'>;
    @Input() public index: number;
    @Output() public OnRemove = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }
}
