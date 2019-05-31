import {ChangeDetectionStrategy, Component} from '@angular/core';
import {APager} from 'src/app/core/helpers/pager.abstract';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    ...APager.metaData,
})
export class PagerComponent extends APager {
}
