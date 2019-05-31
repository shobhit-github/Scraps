import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

import {
    Validators,
    FormBuilder,
} from '@angular/forms';
import {MatDialogRef, MatAutocompleteSelectedEvent} from '@angular/material';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';
import {IDialogUser} from '../../interfaces/dialog-list.intefaces';

@Component({
    selector: 'app-dialog-global-search',
    templateUrl: './dialog-global-search.component.html',
    styleUrls: ['./dialog-global-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class DialogGlobalSearchComponent implements OnInit {
    @Output() public OnUserChange = new EventEmitter<IDialogUser>();
    @Output() public OnSubmit = new EventEmitter<string>();
    @Input() public userList: Array<IDialogUser>;
    public form = this.fb.group({
        q: [
            '',
            Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(40),
                Validators.required,
            ]),
        ],
    });

    constructor(
        public dialogRef: MatDialogRef<DialogGlobalSearchComponent>,
        private fb: FormBuilder,
        public matcher: MyErrorStateMatcher,
    ) {
    }

    ngOnInit() {
        this.onSubmit();
    }

    onSubmit() {
        this.OnSubmit.emit(this.form.get('q').value);
    }

    onUserChange(event: MatAutocompleteSelectedEvent) {
        this.OnUserChange.emit(event.option.value);
        this.dialogRef.close();
    }

    public displayFn(user?: IDialogUser): string | undefined {
        return user ? user.name : undefined;
    }
}
