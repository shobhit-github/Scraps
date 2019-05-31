import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IWalletKeys} from '../../interfaces/wallet.interfaces';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit, OnChanges {
    @Input()
    public walletKeys: IWalletKeys;
    @Output()
    public saveWalletKeys = new EventEmitter<IWalletKeys>();
    public form = this.fb.group({
        public_key: this.fb.control({
            value: '',
        }),
        private_key: this.fb.control({
            value: '',
        }),
    });

    constructor(
        private fb: FormBuilder,
    ) {
    }

    private savePublicKey(form: FormGroup, key: string) {
        form.get('public_key').setValue(key);
    }

    private savePrivateKey(form: FormGroup, key: string) {
        form.get('private_key').setValue(key);
    }

    public clickSaveWalletKeys() {
        this.saveWalletKeys.emit(this.form.value);
    }

    ngOnInit() {
        this.savePublicKey(this.form, this.walletKeys.public_key);
        this.savePrivateKey(this.form, this.walletKeys.private_key);
    }

    ngOnChanges(): void {
        this.savePublicKey(this.form, this.walletKeys.public_key);
        this.savePrivateKey(this.form, this.walletKeys.private_key);
    }
}
