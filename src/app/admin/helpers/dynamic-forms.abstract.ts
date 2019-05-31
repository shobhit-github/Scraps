import {FormGroup, FormBuilder} from '@angular/forms';
import {
    Input,
    ViewChild,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
} from '@angular/core';
import {MatSort, MatPaginator, PageEvent} from '@angular/material';
import {IIcoFieldsItem} from '../components/table-ico/table-ico-fields-config';
import {isMoment} from 'moment';
import {SKRAPS_DATE_FORMAT} from '../date.config';

export interface IItem extends Object {
    id?: string;
    isNew?: boolean;
}

export abstract class ADynamicForms<T extends IItem> implements OnChanges {
    static metaData = {
        queries: {
            sort: new ViewChild(MatSort),
            paginator: new ViewChild(MatPaginator),
        },
        inputs: ['shadow', 'list', 'totalRows'],
        outputs: ['OnSubmit', 'OnAdd', 'OnDelete', 'OnPage'],
    };
    public isFormData = true;
    public fieldsConfig: Array<IIcoFieldsItem>;
    public forms: { [key: string]: FormGroup };
    public fileList = {};
    public filePreviewList = {};
    @Input()
    shadow = true;
    @Input()
    list: Array<T>;
    @Input()
    totalRows: number;
    @ViewChild(MatSort)
    sort: MatSort;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @Output()
    OnSubmit = new EventEmitter<T | FormData>();
    @Output()
    OnAdd = new EventEmitter<undefined>();
    @Output()
    OnDelete = new EventEmitter<T>();
    @Output()
    OnPage = new EventEmitter<PageEvent>();
    protected deleteItems = (forms, deleted: Array<string>) => {
        if (deleted.length === 0) {
            return forms;
        }
        return Object.keys(forms)
            .filter(id => !deleted.includes(id))
            .reduce(
                (memo, id) => ({
                    ...memo,
                    [id]: forms[id],
                }),
                {},
            );
    };
    protected generateConfig = ico => {
        return [
            ico.id,
            this.fieldsConfig.reduce(
                (memo, pair) => ({
                    ...memo,
                    [pair.name]: [ico[pair.name], pair.validator],
                    // [pair.name]: pair.isSub ? this.generateConfig(ico[pair.name]) : [ico[pair.name], pair.validator] ,
                }),
                {},
            ),
        ];
    };
    protected generateGroup = (
        memo: { [key: string]: FormGroup },
        [id, pair]: [string, { [key: string]: any }],
    ): { [key: string]: FormGroup } => {
        return {
            ...memo,
            [id]: this.fb.group(pair),
        };
    };
    protected addItems = (
        list,
        added?: Array<string>,
    ): { [key: string]: FormGroup } => {
        if (added && added.length > 0) {
            list = list.filter(el => added.includes(el.id));
        }
        return (
            list
                .map(this.generateConfig)
                // generate obj id: FormGroup
                .reduce(this.generateGroup, {})
        );
    };

    constructor(protected fb: FormBuilder, protected cd: ChangeDetectorRef) {
    }

    ngOnChanges(sch: SimpleChanges) {
        if (!this.forms) {
            this.forms = this.addItems(this.list);
        } else {
            const prev: Array<string> = sch.list.previousValue.map(item => item.id);
            const cur: Array<string> = sch.list.currentValue.map(item => item.id);
            const deleted = prev.filter(item => !cur.includes(item));
            const added = cur.filter(item => !prev.includes(item));
            if (deleted.length > 0 || added.length > 0) {
                this.forms = {
                    ...this.deleteItems(this.forms, deleted),
                    ...(added.length > 0 && this.addItems(this.list, added)),
                };
            }
        }
    }

    protected convertDates(data: T): T {
        return Object.entries(data).reduce(
            (memo, [key, val]) => {
                return {
                    ...(<any>memo),
                    [key]: isMoment(val)
                        ? val.format(SKRAPS_DATE_FORMAT.parse.dateInput)
                        : val,
                };
            },
            <T>{},
        );
    }

    public byId(i, item: T) {
        return item.id;
    }

    public byName(ico) {
        return (i, item) => `${ico.id}_${item.name}`;
    }

    public fileChange(event, id) {
        this.fileList[id] = event.target.files[0];
        if (this.forms[id] && this.forms[id].get('logo')) {
            this.forms[id].get('logo').setValue(this.fileList[id]);
        }
        if (this.forms[id] && this.forms[id].get('icon')) {
            this.forms[id].get('icon').setValue(this.fileList[id]);
        }
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            (e: any) => {
                this.filePreviewList[id] = e.target.result;
                this.cd.detectChanges();
            },
            {
                once: true,
            },
        );
        reader.readAsDataURL(this.fileList[id]);
    }

    public onSubmit(form: FormGroup, id?: string) {
        const value: T = form.value;
        const icoValue = this.list.find(item => item.id === id);
        // if ICO is exist merge with state, else just form's data
        const data: T = icoValue
            ? Object.keys(icoValue)
            // delete already present
                .filter(key => !(<Object>value).hasOwnProperty(key))
                // merge
                .reduce<any>(
                    (memo, pair) => ({...memo, [pair]: icoValue[pair]}),
                    value,
                )
            : value;
        const changedData = this.convertCheckboxes(
            this.addFiles(this.convertDates(data)),
        );
        this.OnSubmit.emit(
            this.isFormData ? this.createFormData(changedData) : changedData,
        );
    }

    protected convertCheckboxes(data: T) {
        const dataWithCheckboxes = {...(<any>data)};
        if (typeof dataWithCheckboxes.intend !== 'undefined') {
            dataWithCheckboxes.intend = dataWithCheckboxes.intend ? 1 : 0;
        }
        if (typeof dataWithCheckboxes.customer !== 'undefined') {
            dataWithCheckboxes.customer = dataWithCheckboxes.customer ? 1 : 0;
        }
        if (typeof dataWithCheckboxes.suggest !== 'undefined') {
            dataWithCheckboxes.suggest = dataWithCheckboxes.suggest ? 1 : 0;
        }
        return dataWithCheckboxes;
    }

    protected addFiles(data: T) {
        const file = this.fileList[data.id];
        const dataWithFiles = {...(<any>data)};
        if (file) {
            dataWithFiles.logo = file;
            return dataWithFiles;
        }
        return Object.entries(dataWithFiles)
            .filter(([key, val]) => key !== 'logo')
            .reduce(
                (memo, [key, val]) => ({
                    ...memo,
                    [key]: val,
                }),
                {},
            );
    }

    protected createFormData(data: T): FormData {
        const formData = new FormData();
        Object.entries(data).forEach(([key, val]) => {
            formData.append(key, val);
        });
        return formData;
    }

    public addFile(el) {
        el.click();
    }
}
