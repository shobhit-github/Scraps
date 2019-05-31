import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    Inject,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import * as moment from 'moment';
import {ScrollbarComponent} from 'ngx-scrollbar';
import * as scrollToElement from 'scroll-to-element';

import {ILoginResponse} from '../../../auth/interfaces/login.interface';
import {
    IFileMessageResponse,
    IMessage,
} from '../../interfaces/chat.interfaces';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements AfterViewChecked, OnInit, OnChanges {
    @Input()
    public user: ILoginResponse;
    @Input()
    public sender: ILoginResponse;
    @Input()
    public messageList: Array<IMessage>;
    @Input()
    public isNew: boolean;
    @Input()
    public filterMessageList: Array<IMessage>;
    @Input()
    public searchQuery: string;
    public activeIndex = 1;
    public userScroll: boolean;
    public moreDisplay = true;
    public mid: number;
    public midBottom: number;
    // debounce
    private deb = false;
    // first open
    private virgin = true;

    @Input()
    public set successSend(val) {
        if (val) {
            this.scroll();
        }
    }

    @Output()
    public OnOpenDialog = new EventEmitter<{ image: string }>();
    @Output()
    public OnLoadMessages = new EventEmitter<{
        mid?: number;
        conversation_id: number;
        reset?: boolean;
        dir?: 'up' | 'down';
        addToArr?: Array<IMessage>;
    }>();
    @ViewChild(ScrollbarComponent)
    scrollRef: ScrollbarComponent;
    private formats = {
        audio: ['mp3', 'wav', 'acc', 'ogg'],
        image: ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'webp'],
        video: ['mp4', 'webm' /*, 'ogg'*/],
        document: ['doc', 'docx', 'xls', 'xlsx'],
    };
    public conversation_id: number;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    ngOnChanges() {
        this.setVars();
        // if (this.scrollRef) {
        //   if (this.scrollEl) {
        //     this.scrollRef.scrollYTo(
        //       this.scrollEl.scrollHeight -
        //         this.scrollEl.clientHeight -
        //         this.scrollPosition,
        //     );
        //   } else {
        //     this.scrollRef.scrollYTo(this.scrollPosition);
        //   }
        // }
        if (
            this.activeIndex > 1 &&
            this.filterMessageList &&
            this.filterMessageList.length > 0
        ) {
            const el = this.document.querySelector(
                `[data-scroll="${
                    this.filterMessageList[
                    this.filterMessageList.length - this.activeIndex
                        ].id
                    }"]`,
            );
            if (el) {
                const messageEl = el.closest('.chat__text');
                if (messageEl) {
                    setTimeout(() => {
                        this.userScroll = true;
                        scrollToElement(messageEl, {
                            offset: 0,
                            ease: 'out-bounce',
                            duration: 1500,
                            align: 'bottom',
                        });
                    }, 400);
                }
            }
        }
    }

    ngOnInit() {
        this.setVars();
        // if (this.filterMessageList && this.filterMessageList.length > 0) {
        //   this.OnLoadMessages.emit({
        //     conversation_id: this.conversation_id,
        //     mid: this.midBottom,
        //     reset: false,
        //     addToArr: [],
        //     dir: 'down'
        //   });
        // }
    }

    setVars() {
        if (this.messageList && this.messageList.length > 0) {
            if (
                Number(this.conversation_id) !==
                Number(this.messageList[0].conversation_id)
            ) {
                this.userScroll = false;
                if (this.filterMessageList && this.filterMessageList.length > 0) {
                    this.moreDisplay = true;
                    this.activeIndex = 1;
                }
            }
            this.conversation_id = this.messageList[0].conversation_id;
            this.mid = this.messageList[0].id;
            this.midBottom = this.messageList[this.messageList.length - 1].id;
        }
    }

    ngAfterViewChecked() {
        this.scroll();
    }

    scroll() {
        if (this.scrollRef) {
            if (!this.userScroll) {
                this.virgin = true;
                this.scrollRef.scrollToBottom();
            }
        }
    }

    isType(type: 'audio' | 'image' | 'video' | 'document'): Function {
        return file => {
            const fileExt = this.getFileExt(file);
            return this.formats[type].includes(fileExt);
        };
    }

    getFileExt(file: IFileMessageResponse) {
        return file.url
            .split('.')
            .pop()
            .split('?')
            .shift()
            .toLowerCase();
    }

    bigDateDiff(dateA: string, dateB: string): boolean {
        return Math.abs(moment(dateA).diff(moment(dateB), 'minutes')) > 5;
    }

    isDisplayDate(
        messageList: Array<IMessage>,
        message: IMessage,
        i: number,
    ): boolean {
        return (
            (messageList[i + 1] &&
                (messageList[i + 1].user_id !== message.user_id ||
                    this.bigDateDiff(
                        message.updated_at,
                        messageList[i + 1].updated_at,
                    ))) ||
            !messageList[i + 1] ||
            message.files.length > 0
        );
    }

    loadMessages(event) {
    }

    domOpt(index: number, data: any) {
        return data.id;
    }

    onScrollTop(event) {
        if (event && event.target && !this.virgin) {
            if (event.target.scrollTop < event.target.clientHeight * 2) {
                if (!this.deb) {
                    this.deb = true;
                    this.userScroll = true;
                    this.OnLoadMessages.emit({
                        conversation_id: this.conversation_id,
                        mid: this.mid,
                    });
                }
            } else if (
                event.target.scrollHeight <
                event.target.clientHeight * 2 + event.target.scrollTop &&
                event.target.scrollHeight -
                event.target.clientHeight -
                event.target.scrollTop >
                0
            ) {
                if (!this.deb) {
                    this.deb = true;
                    this.userScroll = true;
                    this.OnLoadMessages.emit({
                        conversation_id: this.conversation_id,
                        mid: this.midBottom,
                        dir: 'down',
                    });
                }
            } else {
                this.deb = false;
            }
        } else {
            this.virgin = false;
        }
    }

    jump(message: IMessage) {
        this.activeIndex++;
        if (this.activeIndex >= this.filterMessageList.length) {
            this.moreDisplay = false;
        }
        this.OnLoadMessages.emit({
            conversation_id: this.conversation_id,
            mid: message.id,
            reset: true,
            addToArr: [message],
        });
        this.OnLoadMessages.emit({
            conversation_id: this.conversation_id,
            mid: message.id,
            reset: false,
            addToArr: [message],
            dir: 'down',
        });
    }
}
