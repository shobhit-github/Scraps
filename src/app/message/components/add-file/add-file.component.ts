import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    Input,
    EventEmitter,
} from '@angular/core';

export interface IFilePreview {
    name: string;
    url: string;
}

export class FilePreview implements IFilePreview {
    constructor(public url = '', public name = '') {
    }
}

@Component({
    selector: 'app-add-file',
    templateUrl: './add-file.component.html',
    styleUrls: ['./add-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFileComponent implements OnInit {
    @Input() public multiple: boolean;
    @Input() public statusList: Array<'pending' | 'done' | 'error'> = [];
    @Output()
    public OnFileListChanged = new EventEmitter<{
        fileList: Array<File>;
    }>();
    @Output()
    public OnAddedFilePreview = new EventEmitter<{
        preview: IFilePreview;
    }>();
    private fileList: Array<File> = [];
    private readerList: Array<FileReader> = [];
    private previewTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/jpg',
    ];

    constructor() {
    }

    addListeners(fileList: Array<File>) {
        const count = fileList.length;
        this.removeListeners(fileList);
        this.readerList = Array.from(this.generateReaders(0, count));
        this.readerList.forEach((reader, i) =>
            reader.addEventListener('load', this.filePreviewFabric(fileList[i]), {
                once: true,
            }),
        );
    }

    filePreviewFabric(file: File): any {
        return (event) => this.fileListPreviewSet(event, file);
    }

    * generateReaders(start, stop) {
        for (let i = start; i < stop; i++) {
            yield new FileReader();
        }
    }

    removeListeners(fileList: Array<File>) {
        this.readerList.forEach((reader, i) =>
            reader.removeEventListener('load', this.filePreviewFabric(fileList[i])),
        );
    }

    ngOnInit() {
    }

    fileListPreviewSet(event: any /*FileReaderProgressEvent*/, file: File) {
        const preview = event.target.result;
        this.OnAddedFilePreview.emit({
            preview: new FilePreview(preview, file.name),
        });
    }

    fileListChange(event) {
        this.fileList = Array.from(event.target.files);
        if (this.fileList.length) {
            this.addListeners(this.fileList);
            this.fileList.forEach((file, i) => {
                if (this.previewTypes.includes(file.type)) {
                    this.readerList[i].readAsDataURL(file);
                } else {
                    this.OnAddedFilePreview.emit({
                        preview: new FilePreview('insert_drive_file', file.name),
                    });
                }
            });
            this.OnFileListChanged.emit({
                fileList: this.fileList,
            });
        }
    }

    // fileRemove(fileIndex: number) {
    //   this.fileList.splice(fileIndex, 1);
    //   this.filePreviewList.splice(fileIndex, 1);
    // }
    addFile(el) {
        el.click();
    }
}
