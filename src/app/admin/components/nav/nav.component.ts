import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState,
} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
    @Output() public OnLogout = new EventEmitter();
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map((result: BreakpointState) => result.matches));

    constructor(private breakpointObserver: BreakpointObserver) {
    }
}
