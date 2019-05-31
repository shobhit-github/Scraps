import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, debounceTime, map, mergeMap} from 'rxjs/operators';

import * as fromMessage from '../actions/message.actions';
import {
    IDialogListItem,
    IDialogUser,
} from '../interfaces/dialog-list.intefaces';
import * as fromIndex from '../reducers';
import * as fromStore from '../reducers/message.reducer';
import {MessageService} from '../services/message.service';

@Injectable()
export class MessageEffects {
    @Effect()
    loadDialogs$ = this.actions$.pipe(
        ofType(fromMessage.MessageActionTypes.LoadDialogs),
        mergeMap(() =>
            this.messageService.getDialogs().pipe(
                map(dialogList => new fromMessage.SuccessLoadDialogs(dialogList)),
                catchError(() => of(new fromMessage.FailedLoadDialogs())),
            ),
        ),
    );
    @Effect()
    loadAndChangeDialogs$ = this.actions$.pipe(
        ofType(fromMessage.MessageActionTypes.LoadAndChangeDialog),
        mergeMap((action: fromMessage.LoadAndChangeDialog) =>
            this.messageService.getDialogs().pipe(
                map(
                    dialogList =>
                        new fromMessage.SuccessLoadAndChangeDialog(
                            dialogList,
                            action.conversation_id,
                        ),
                ),
                catchError(() => of(new fromMessage.FailedLoadAndChangeDialog())),
            ),
        ),
    );
    @Effect()
    selectDialog$ = this.actions$.pipe(
        ofType<fromMessage.ChangeDialog>(
            fromMessage.MessageActionTypes.ChangeDialog,
        ),
        map(action => {
            const filtered = action.dialog.filterMessageList;
            if (filtered) {
                // console.log(action.dialog);

                return new fromMessage.LoadMessages(
                    action.dialog.conversation_id,
                    filtered[filtered.length - 1].id,
                    true,
                    [filtered[filtered.length - 1]],
                );
            } else {
                return new fromMessage.LoadMessages(action.dialog.conversation_id);
            }
        }),
    );
    @Effect()
    loadMessages$ = this.actions$.pipe(
        ofType<fromMessage.LoadMessages>(
            fromMessage.MessageActionTypes.LoadMessages,
        ),
        mergeMap((action: fromMessage.LoadMessages) => {
            return this.messageService
                .getMessages(action.conversation_id, action.mid, action.dir)
                .pipe(
                    map(
                        messageList =>
                            new fromMessage.SuccessLoadMessages(
                                messageList,
                                action.reset,
                                action.addToArr,
                                action.dir,
                            ),
                    ),
                    catchError(() => of(new fromMessage.FailedLoadMessages())),
                );
        }),
    );
    @Effect()
    uploadFile$ = this.actions$.pipe(
        ofType<fromMessage.UploadFile>(fromMessage.MessageActionTypes.UploadFile),
        mergeMap(action =>
            this.messageService.loadFile(action.file).pipe(
                map(fileId => new fromMessage.SuccessUploadFile(fileId, action.index)),
                catchError(() => of(new fromMessage.FailedUploadFile(action.index))),
            ),
        ),
    );
    @Effect()
    sendMessage$ = this.actions$.pipe(
        ofType<fromMessage.SendMessage>(fromMessage.MessageActionTypes.SendMessage),
        mergeMap(action =>
            this.messageService.sendMessage(action.message, action.receiver_id).pipe(
                map(conversation_id => {
                    return new fromMessage.SuccessSendMessage(conversation_id);
                }),
                catchError(() => of(new fromMessage.FailedSendMessage())),
            ),
        ),
    );
    @Effect()
    successSend$ = this.actions$.pipe(
        ofType<fromMessage.SuccessSendMessage>(
            fromMessage.MessageActionTypes.SuccessSendMessage,
        ),
        mergeMap(action =>
            this.store.pipe(
                select(fromIndex.getSelectedDialog),
                map(
                    dialog =>
                        dialog
                            ? new fromMessage.ResetFiles(action.conversation_id)
                            : new fromMessage.LoadAndChangeDialog(action.conversation_id),
                ),
            ),
        ),
    );
    @Effect()
    selectUser$ = this.actions$.pipe(
        ofType<fromMessage.SelectUser>(fromMessage.MessageActionTypes.SelectUser),
        mergeMap(action =>
            this.store.pipe(
                select(fromIndex.getDialogList),
                map(dialogList =>
                    dialogList.find(item => item.user.id === action.user.id),
                ),
            ),
        ),
        map(
            dialog =>
                dialog
                    ? new fromMessage.ChangeDialog(dialog)
                    : new fromMessage.FailedSearchUser(),
        ),
    );
    @Effect()
    searchUser$ = this.actions$.pipe(
        ofType<fromMessage.SearchUser>(fromMessage.MessageActionTypes.SearchUser),
        debounceTime(500),
        mergeMap(action =>
            this.messageService.globalSearch(action.query).pipe(
                map(
                    (userList: Array<IDialogUser>) =>
                        new fromMessage.SuccessSearchUser(userList),
                ),
                catchError(() => of(new fromMessage.FailedSearchUser())),
            ),
        ),
    );
    @Effect()
    searchDialog$ = this.actions$.pipe(
        ofType<fromMessage.SearchDialog>(
            fromMessage.MessageActionTypes.SearchDialog,
        ),
        debounceTime(500),
        mergeMap(action =>
            this.messageService.gqlGlobalSearch(action.query).pipe(
                map(
                    (filteredDialogs: Array<IDialogListItem>) =>
                        new fromMessage.SuccessSearchDialog(filteredDialogs),
                ),
                catchError(() => of(new fromMessage.FailedSearchDialog())),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private messageService: MessageService,
        private store: Store<fromStore.State>,
    ) {
    }
}
