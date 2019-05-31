import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    HostListener,
    ElementRef,
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {select, Store} from '@ngrx/store';
import * as Pusher from 'pusher-js';
import {Observable, Subscription} from 'rxjs';
import {map, tap, mergeMap} from 'rxjs/operators';

import {SafeUrl} from '../../../../../node_modules/@angular/platform-browser';
import * as fromUser from '../../../core/reducers/user.reducer';
import {getUserState} from '../../../reducers';
import * as fromMessage from '../../actions/message.actions';
import * as fromVoice from '../../actions/voice.actions';
import {
    AddFileComponent,
    IFilePreview,
} from '../../components/add-file/add-file.component';
import {DialogGlobalSearchComponent} from '../../components/dialog-global-search/dialog-global-search.component';
import {DialogLightboxComponent} from '../../components/dialog-lightbox/dialog-lightbox.component';
import {IMessage, IMessageRequest} from '../../interfaces/chat.interfaces';
import {
    IDialogListItem,
    IDialogUser,
} from '../../interfaces/dialog-list.intefaces';
import * as fromStore from '../../reducers';
import {NgForm, FormGroup} from '../../../../../node_modules/@angular/forms';
import {TypeComponent} from '../../components/type/type.component';
import {AbstractControlCustom} from '../../interfaces/control.abstract';
import {PickerComponent} from '../../../../../node_modules/@ctrl/ngx-emoji-mart';

@Component({
    selector: 'app-message-page',
    templateUrl: './message-page.component.html',
    styleUrls: ['./message-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePageComponent implements OnInit, OnDestroy {
    public dialogList$: Observable<Array<IDialogListItem>>;
    public filterDialogList$: Observable<Array<IDialogListItem>>;
    public messageList$: Observable<Array<IMessage>>;
    public user$: Observable<fromUser.State>;
    public pending$: Observable<boolean>;
    public fileIdList$: Observable<Array<number>>;
    public fileIdList: Array<number>;
    public voiceIdList$: Observable<Array<number>>;
    public voiceIdList: Array<number>;
    public voicePreviewList$: Observable<Array<SafeUrl>>;
    public successSend$: Observable<boolean>;
    public mid$: Observable<number>;
    public fileStatusList$: Observable<Array<'pending' | 'done' | 'error'>>;
    @ViewChild(AddFileComponent)
    public addFileRef: AddFileComponent;
    @ViewChild(TypeComponent)
    public typeRef: TypeComponent;
    @ViewChild('picker')
    public emojiRef: ElementRef;
    @ViewChild('toggler')
    public togglerRef: ElementRef;
    public selectedDialog$: Observable<IDialogListItem>;
    public socket = new Pusher('832eaa682468a5677c6e', {
        cluster: 'us2',
        encrypted: false,
        authEndpoint: '',
        // disabledTransports: ['wss'],
    });
    public fileList: Array<File>;
    public filePreviewList$: Observable<Array<IFilePreview>>;
    public searchQuery$: Observable<string>;
    public userList$: Observable<Array<IDialogUser>>;
    public currentUser$: Observable<IDialogUser>;
    public inProgress$: Observable<boolean>;
    public mobileMenuActive$: Observable<boolean>;
    public mobileMenuActive: boolean;
    private subscriberList: Array<Subscription> = [];
    private searchDialogRef: MatDialogRef<DialogGlobalSearchComponent>;
    private channel;
    private channelDialogs;
    public emojiPickerActive = false;

    constructor(
        private store: Store<fromStore.State>,
        private dialog: MatDialog,
    ) {
        this.dialogList$ = this.store.pipe(select(fromStore.getDialogList));
        this.filterDialogList$ = this.store.pipe(
            select(fromStore.getFilterDialogList),
        );
        this.store.dispatch(new fromMessage.LoadDialogs());
        this.user$ = this.store.pipe(select(getUserState));
        this.inProgress$ = this.store.pipe(select(fromStore.getVoiceStatus));
        this.mobileMenuActive$ = this.store
            .pipe(select(fromStore.getMenuStatus))
            .pipe(tap(status => (this.mobileMenuActive = status)));
        this.pending$ = this.store.pipe(select(fromStore.getPending));
        this.successSend$ = this.store.pipe(select(fromStore.getSuccessSend));
        this.userList$ = this.store.pipe(select(fromStore.getUserList));
        this.currentUser$ = this.store.pipe(select(fromStore.getCurrentSearchUser));
        this.searchQuery$ = this.store.pipe(select(fromStore.getQuery));

        this.messageList$ = this.store.pipe(select(fromStore.getMessageList)).pipe(
            map(
                messageList =>
                    messageList
                        ? messageList.map(message => ({
                            ...message,
                            files: [...message.files, ...message.voices],
                        }))
                        : messageList,
            ),
        );
        this.fileStatusList$ = this.store.pipe(select(fromStore.getFileStatusList));
        this.mid$ = this.store.pipe(select(fromStore.getMid));
        this.fileIdList$ = this.store.pipe(select(fromStore.getFileIdList));
        this.subscriberList.push(
            this.fileIdList$.subscribe(fileIdList => {
                this.fileIdList = fileIdList;
            }),
        );
        this.filePreviewList$ = this.store.pipe(
            select(fromStore.getFilePreviewList),
        );
        this.voiceIdList$ = this.store.pipe(select(fromStore.getVoiceIdList));
        this.subscriberList.push(
            this.voiceIdList$.subscribe(voiceIdList => {
                this.voiceIdList = voiceIdList;
            }),
        );
        this.voicePreviewList$ = this.store.pipe(
            select(fromStore.getVoicePreviewList),
        );
        this.selectedDialog$ = this.store.pipe(select(fromStore.getSelectedDialog));
        this.subscriberList.push(
            this.userList$.subscribe(userList => {
                if (this.searchDialogRef && this.searchDialogRef.componentInstance) {
                    this.searchDialogRef.componentInstance.userList = userList;
                }
            }),
        );

        this.socket.connection.bind('connected', () => {
            // console.log('Realtime is go!');
        });
        this.subscriberList.push(
            this.selectedDialog$.subscribe(selectedDialog => {
                // console.log(this.channel);
                if (this.channel) {
                    this.channel.unbind_all();
                    this.channel.unsubscribe();
                }
                if (selectedDialog) {
                    this.channel = this.socket.subscribe(
                        `conversation.${selectedDialog.conversation_id}`,
                    );
                    // console.log(this.channel);
                    this.channel.bind('message.pusher', data => {
                        this.store.dispatch(new fromMessage.AddMessage(data.message));
                    });
                }
            }),
        );
        this.subscriberList.push(
            this.user$.subscribe(user => {
                if (user && user.user_id) {
                    if (this.channelDialogs) {
                        this.channelDialogs.unbind_all();
                        this.channelDialogs.unsubscribe();
                    }
                    this.channelDialogs = this.socket.subscribe(`chats.${user.user_id}`);
                    // console.log(this.channel);
                    this.channelDialogs.bind('chats.pusher', data => {
                        this.store.dispatch(new fromMessage.LoadDialogs());
                    });
                }
            }),
        );
    }

    loadFiles({fileList}: { fileList: Array<File> }) {
        this.fileList = fileList;
        this.fileList.forEach((file, i) =>
            this.store.dispatch(new fromMessage.UploadFile(file, i)),
        );
    }

    getStrLength(str) {
        const joiner = '\u{200D}';
        const split = str.split(joiner);
        let count = 0;

        for (const s of split) {
            // removing the variation selectors
            const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join('')).length;
            count += num;
        }

        // assuming the joiners are used appropriately
        return count / split.length;
    }

    getSelectionRange() {
        return document.getSelection();
    }

    placeCaretAtEnd(el) {
        el.focus();
        if (
            typeof window.getSelection !== 'undefined' &&
            typeof document.createRange !== 'undefined'
        ) {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    public addEmoji(event, form: FormGroup) {
        const {$event, emoji} = event;
        $event.preventDefault();
        const control = <AbstractControlCustom>form.get('message');
        const el: HTMLInputElement = control.nativeElement;
        const value = control.value || '';
        control.setValue(value + emoji.native);
        this.placeCaretAtEnd(el);
    }

    public toggleEmoji() {
        this.emojiPickerActive = !this.emojiPickerActive;
    }

    addFilePreview({preview}: { preview: IFilePreview }) {
        this.store.dispatch(new fromMessage.SuccessPreviewFiles(preview));
    }

    ngOnInit() {
    }

    search(q: string) {
        // console.log(q);

        // this.filterDialogList$ = this.dialogList$.pipe(
        //   map(dialogList => {
        //     const resultList = dialogList.filter(item =>
        //       item.user.name.toLowerCase().includes(q.toLowerCase()),
        //     );
        //     if (resultList.length < 1) {
        //       return dialogList;
        //     }
        //     return resultList;
        //   }),
        // );
        // this.filterDialogList$ = gqlGlobalSearch(q)
        this.store.dispatch(new fromMessage.SearchDialog(q));
    }

    openDialog({image, isSearch}: { image?: any; isSearch: boolean }): void {
        if (image) {
            /*const dialogRef = */
            this.dialog.open(DialogLightboxComponent, {
                width: '90%',
                data: image,
                height: 'auto',
                panelClass: 'modal',
            });
        }
        if (isSearch) {
            this.searchDialogRef = this.dialog.open(DialogGlobalSearchComponent, {
                width: '40%',
                height: 'auto',
                panelClass: 'modal',
            });
            if (this.searchDialogRef && this.searchDialogRef.componentInstance) {
                this.subscriberList.push(
                    this.searchDialogRef.componentInstance.OnUserChange.subscribe(
                        currentSearchUser => {
                            this.store.dispatch(
                                new fromMessage.SelectUser(currentSearchUser),
                            );
                        },
                    ),
                );
                this.subscriberList.push(
                    this.searchDialogRef.componentInstance.OnSubmit.subscribe(q => {
                        this.store.dispatch(new fromMessage.SearchUser(q));
                    }),
                );
            }
        }
    }

    sendMessage({
                    message,
                    receiver_id,
                    isNew,
                }: {
        message: string;
        receiver_id: number;
        isNew?: boolean;
    }) {
        const data: IMessageRequest = {
            files: this.fileIdList,
            voices: this.voiceIdList,
        };

        if (message) {
            data.message = message;
        }
        if (
            message ||
            (this.fileIdList && this.fileIdList.length > 0) ||
            (this.voiceIdList && this.voiceIdList.length > 0)
        ) {
            if (isNew) {
                this.store.dispatch(new fromMessage.SendNewMessage(data, receiver_id));
            } else {
                this.store.dispatch(new fromMessage.SendMessage(data, receiver_id));
            }
        }
        if (this.emojiPickerActive) {
            this.toggleEmoji();
        }
    }

    fileRemove(index: number) {
        this.store.dispatch(new fromMessage.RemoveFile(index));
    }

    voiceRemove(index: number) {
        this.store.dispatch(new fromVoice.RemoveVoice(index));
    }

    selectDialog(dialog: IDialogListItem) {
        this.store.dispatch(new fromMessage.ChangeDialog(dialog));
    }

    loadMessages({
                     conversation_id,
                     mid,
                     reset,
                     dir,
                     addToArr,
                 }: {
        conversation_id: number;
        mid?: number;
        reset?: boolean;
        dir?: 'up' | 'down';
        addToArr?: Array<IMessage>;
    }) {
        this.store.dispatch(
            new fromMessage.LoadMessages(
                conversation_id,
                mid,
                reset,
                addToArr || [],
                dir,
            ),
        );
    }

    @HostListener('document:click', ['$event.target'])
    onClickedOutside(target) {
        if (
            this.emojiRef &&
            !this.emojiRef.nativeElement.contains(target) &&
            !this.togglerRef.nativeElement.contains(target) &&
            this.emojiPickerActive
        ) {
            this.toggleEmoji();
        }
    }

    onRecord(fileAndPreview: { preview: SafeUrl; file: File }) {
        this.store.dispatch(new fromVoice.AddVoice(fileAndPreview));
        this.store.dispatch(new fromVoice.StopVoice());
    }

    onStartRecord() {
        this.store.dispatch(new fromVoice.StartVoice());
    }

    onNoMicro() {
        this.store.dispatch(new fromVoice.NoMicro());
    }

    ngOnDestroy() {
        this.subscriberList.forEach(subscr => subscr.unsubscribe());
    }

    toggleMenu() {
        if (this.mobileMenuActive) {
            this.store.dispatch(new fromMessage.CloseMobile());
        } else {
            this.store.dispatch(new fromMessage.OpenMobile());
        }
    }

    byId(i, item) {
        return item.conversation_id;
    }
}
