import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';

import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers/risk.reducer';
import {Title} from '@angular/platform-browser';
import {LoadQuestions, SetActive} from '../../actions/risk.actions';
import {
    Observable,
    BehaviorSubject,
    Subscription,
    SubscriptionLike,
} from 'rxjs';
import {IQuestion} from '../../interfaces/question.interface';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {filter, map, tap, startWith, mergeMap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
    selector: 'app-risk-page',
    templateUrl: './risk-page.component.html',
    styleUrls: ['./risk-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskPageComponent implements OnDestroy {
    private subscriptionList: Array<SubscriptionLike> = [];
    public title$ = this.store.pipe(
        select(fromStore.getTitle),
        tap(title => {
            this.title.setTitle(title);
            this.cd.detectChanges();
            // console.log('set title:', title);
        }),
    );

    constructor(
        private store: Store<fromStore.State>,
        private cd: ChangeDetectorRef,
        private title: Title,
        private location: Location,
        private router: Router,
    ) {
        this.subscriptionList.push(
            this.location.subscribe(({url}) => {
                if (url === '/quiz/progress' || url === '/quiz/finish') {
                    this.router.navigate(['/quiz', 'start']);
                }
            }),
        );
    }

    ngOnDestroy() {
        if (this.subscriptionList) {
            this.subscriptionList.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }
}
