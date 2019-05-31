import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IcoRoutingModule} from './ico-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromIco from './reducers';
import * as fromList from './reducers/list.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ListEffects} from './effects/list.effects';
import * as fromDetail from './reducers/detail.reducer';
import {DetailEffects} from './effects/detail.effects';
import {IcoListContainerComponent} from './containers/ico-list-container/ico-list-container.component';
import {IcoListComponent} from './components/ico-list/ico-list.component';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material';
import {PagerComponent} from './components/pager/pager.component';
import {IcoDetailContainerComponent} from './containers/ico-detail-container/ico-detail-container.component';
import {IcoHeaderComponent} from './components/ico-header/ico-header.component';
import {IcoInfoComponent} from './components/ico-info/ico-info.component';
import {IcoContentComponent} from './components/ico-content/ico-content.component';
import {IcoVideoComponent} from './components/ico-video/ico-video.component';
import {IcoFollowComponent} from './components/ico-follow/ico-follow.component';
import {IcoTabsComponent} from './components/ico-tabs/ico-tabs.component';
import {ShareButtonModule} from '@ngx-share/button';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        MaterialModule,
        ShareButtonModule,
        IcoRoutingModule,
        StoreModule.forFeature('ico', fromIco.reducers, {
            metaReducers: fromIco.metaReducers,
        }),
        StoreModule.forFeature('list', fromList.reducer),
        EffectsModule.forFeature([ListEffects, DetailEffects]),
        StoreModule.forFeature('detail', fromDetail.reducer),
    ],
    declarations: [
        IcoListContainerComponent,
        IcoListComponent,
        PagerComponent,
        IcoDetailContainerComponent,
        IcoHeaderComponent,
        IcoInfoComponent,
        IcoContentComponent,
        IcoVideoComponent,
        IcoFollowComponent,
        IcoTabsComponent,
    ],
    exports: [
        IcoTabsComponent
    ]
})
export class IcoModule {
}
