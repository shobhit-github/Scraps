import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../reducers';
import {
    LoadProfileSettings,
    UpdateProfileSettings,
    ChangeAvatarProfileSettings,
} from '../../actions/profile.actions';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-profile-settings-container',
    templateUrl: './profile-settings-container.component.html',
    styleUrls: ['./profile-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsContainerComponent implements OnInit {
    public profile$ = this.store.select(fromStore.getProfile);

    constructor(
        private store: Store<fromStore.State>,
        private domSanitizer: DomSanitizer,
    ) {
        this.store.dispatch(new LoadProfileSettings());
    }

    ngOnInit() {
    }

    saveProfile(data: FormData) {
        if (data) {
            this.store.dispatch(new UpdateProfileSettings(data));
        }
    }

    changeAvatar(avatar: File) {
        if (avatar) {
            this.store.dispatch(
                new ChangeAvatarProfileSettings(
                    this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(avatar)),
                ),
            );
        }
    }
}
