import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {ISecuritySettings, IBankSettings, IPlaidSettings} from '../../interfaces/security.interfaces';

@Component({
    selector: 'app-bank-accounts-settings',
    templateUrl: './bank-accounts-settings.component.html',
    styleUrls: ['./bank-accounts-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankAccountsSettingsComponent implements OnInit {
    @Input() public banks: Array<IPlaidSettings>;
    @Output() public OnRemoveBank = new EventEmitter<IPlaidSettings>();

    constructor() {
    }

    ngOnInit() {
    }

}
