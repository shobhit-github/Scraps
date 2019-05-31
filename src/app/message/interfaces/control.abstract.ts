import {AbstractControl} from '@angular/forms';

export abstract class AbstractControlCustom extends AbstractControl {
    nativeElement: HTMLInputElement;
}
