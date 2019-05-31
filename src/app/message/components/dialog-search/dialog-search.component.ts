import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    OnDestroy,
} from '@angular/core';
import {IDialogUser} from '../../interfaces/dialog-list.intefaces';
import {
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-dialog-search',
    templateUrl: './dialog-search.component.html',
    styleUrls: ['./dialog-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSearchComponent implements OnInit, OnDestroy {
    public form: FormGroup = this.fb.group({
        query: '',
    });
    private subsribtion: Subscription;
    @Output() public OnSubmit = new EventEmitter<string>();

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.subsribtion = this.form.get('query').valueChanges.subscribe(val => {
            this.OnSubmit.emit(val);
        });
    }

    ngOnDestroy() {
        if (this.subsribtion) {
            this.subsribtion.unsubscribe();
        }
    }

    public displayFn(user?: IDialogUser): string | undefined {
        return user ? user.name : undefined;
    }
}
