import {
    Component,
    ChangeDetectionStrategy,
    Input,
    SimpleChanges,
    OnChanges,
    Output,
    EventEmitter,
    ChangeDetectorRef,
} from '@angular/core';
import {ADynamicForms} from '../../helpers/dynamic-forms.abstract';
import {
    IPortfolioAdmin,
    IPortfolioOption,
} from '../../interfaces/portfolio.interface';
import {portfolioFieldsConfig} from './portfolio-fields-config';
import {IIcoFieldsItemWith} from '../table-ico/table-ico-fields-config';
import {ICoin} from '../../interfaces/coin.interface';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {OPT_PREFIX} from '../../containers/portfolio-container/prefix';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent extends ADynamicForms<IPortfolioAdmin>
    implements OnChanges {
    public validSums = {};
    @Input()
    public coinList: Array<ICoin>;
    @Output()
    public removeOpt = new EventEmitter<{
        portfolio: IPortfolioAdmin;
        optId: string;
    }>();
    @Output()
    public addOpt = new EventEmitter<string>();
    public normalCoinList: { [key: string]: ICoin };
    protected coinConfigList: {};
    public fieldsConfig: Array<IIcoFieldsItemWith<IPortfolioAdmin>> = portfolioFieldsConfig;
    public isFormData = false;

    constructor(protected fb: FormBuilder, protected cd: ChangeDetectorRef) {
        super(fb, cd);
    }

    public checkSum(parent: FormArray, portfolioId: string) {
        this.validSums[portfolioId] =
            parent.value
                .map(item => item.value)
                .reduce((memo, val) => memo + Number(val), 0) === 100;
    }

    protected generateConfig = ico => {
        return [
            ico.id,
            this.fieldsConfig.reduce((memo, pair) => {
                return {
                    ...memo,
                    [pair.name]:
                        pair.name === 'options' && this.coinList
                            ? this.fb.array(
                            ico.options.map(opt =>
                                this.fb.group({
                                    option_id: [opt.option_id],
                                    coin_id: [opt.coin_id],
                                    value: [opt.value],
                                }),
                            ),
                            )
                            : [ico[pair.name], pair.validator],
                };
            }, {}),
        ];
    };

    ngOnChanges(sch: SimpleChanges) {
        if (sch.coinList) {
            this.normalCoinList = this.coinList.reduce(
                (memo, pair) => ({...memo, [pair.id]: pair}),
                {},
            );
            this.list.forEach(portfolio =>
                this.checkSum(
                    <FormArray>this.forms[portfolio.id].get('options'),
                    portfolio.id,
                ),
            );
        }
        // debugger;
        if (!this.forms) {
            this.forms = this.addItems(this.list);
        } else {
            const prev: Array<string> = sch.list.previousValue.map(item => item.id);
            const prevOptList: Array<string> = sch.list.previousValue
                .map(item => item.options.map(opt => opt.option_id))
                .reduce((optList, item) => [...optList, ...item], []);
            const cur: Array<string> = sch.list.currentValue.map(item => item.id);
            const curOptList: Array<string> = sch.list.currentValue
                .map(item => item.options.map(opt => opt.option_id))
                .reduce((optList, item) => [...optList, ...item], []);
            const deleted = prev.filter(item => !cur.includes(item));
            const deletedOptList = prevOptList.filter(
                item => !curOptList.includes(item),
            );
            const added = cur.filter(item => !prev.includes(item));
            const addedOptList = curOptList.filter(
                item => !prevOptList.includes(item),
            );
            // debugger;
            if (
                deleted.length > 0 ||
                added.length > 0 ||
                deletedOptList.length > 0 ||
                addedOptList.length > 0
            ) {
                this.forms = {
                    ...this.deleteItems(
                        this.deleteOptControls(
                            this.addOptControls(this.list, this.forms, addedOptList),
                            deletedOptList,
                        ),
                        deleted,
                    ),
                    ...(added.length > 0 && this.addItems(this.list, added)),
                };
            }
        }
    }

    protected deleteOptControls(
        forms: { [key: string]: FormGroup },
        deleted: Array<string>,
    ): { [key: string]: FormGroup } {
        this.log(deleted);
        if (deleted.length === 0) {
            return forms;
        }
        Object.values(forms).forEach(form => {
            const optList: FormArray = <FormArray>form.get('options');
            optList.value.forEach((opt, i) => {
                if (deleted.includes(opt.option_id)) {
                    optList.removeAt(i);
                }
            });
            return form;
        });

        return forms;
    }

    protected addOptControls(
        list: Array<IPortfolioAdmin>,
        forms: { [key: string]: FormGroup },
        added: Array<string>,
    ): { [key: string]: FormGroup } {
        if (added.length === 0) {
            return forms;
        }
        list.forEach(portfolio => {
            if (forms[portfolio.id]) {
                const newOptList = portfolio.options.filter(opt =>
                    added.includes(opt.option_id),
                );
                if (newOptList.length > 0) {
                    const optList: FormArray = <FormArray>(
                        forms[portfolio.id].get('options')
                    );
                    newOptList.forEach(newOpt => optList.push(this.fb.group(newOpt)));
                }
            }
        });

        return forms;
    }

    public log(data: any) {
        console.log(data);
    }

    public removeNewOptIds(form: FormGroup) {
        const optList: FormArray = <FormArray>form.get('options');
        const controls = optList.controls;
        controls.map((control: FormGroup) => {
            if (String(control.value.option_id).includes(OPT_PREFIX)) {
                control.removeControl('option_id');
            }
        });
        return form;
    }
}
