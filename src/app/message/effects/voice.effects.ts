import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    VoiceActions,
    VoiceActionTypes,
    AddVoice,
    SuccessUploadVoice,
    FailedUploadVoice,
} from '../actions/voice.actions';
import {
    map,
    mergeMap,
    catchError,
} from '../../../../node_modules/rxjs/operators';
import {SafeUrl} from '../../../../node_modules/@angular/platform-browser';
import {MessageService} from '../services/message.service';
import {of} from '../../../../node_modules/rxjs';

@Injectable()
export class VoiceEffects {
    @Effect()
    addVoice$ = this.actions$.pipe(
        ofType<AddVoice>(VoiceActionTypes.AddVoice),
        map(action => action.payload),
        mergeMap((data: { file: File; preview: SafeUrl; index: number }) =>
            this.messageService.loadVoice(data.file).pipe(
                map(fileId => new SuccessUploadVoice(fileId, data.index)),
                catchError(() => of(new FailedUploadVoice(data.index))),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) {
    }
}
