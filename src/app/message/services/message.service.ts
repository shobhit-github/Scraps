import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import gql from 'graphql-tag';
import {environment} from '../../../environments/environment';
import {IMessage, IMessageRequest} from '../interfaces/chat.interfaces';
import {
    IDialogListItem,
    IDialogUser,
} from '../interfaces/dialog-list.intefaces';
import {Apollo} from 'apollo-angular';

const search = gql`
  # fragment UserInfo on User {
  #   id
  #   name
  #   email
  #   agreement
  #   status
  #   desktop_notification
  #   two_factor_auth
  #   confirm_email
  #   created_at
  #   updated_at
  # }

  # fragment MessageInfo on Message {
  #   id
  #   message
  #   is_seen
  #   deleted_from_sender
  #   deleted_from_receiver
  #   user {
  #     ...UserInfo
  #   }
  #   conversation {
  #     id
  #   }
  #   created_at
  #   updated_at
  # }

  query Search($q: String) {
    getFulltextMessages(search: $q) {
      conversation_id: id
      user {
        id
        name
      }
      status
      created_at
      updated_at
      message {
        id
        message
      }
      messages {
        id
        message
        conversation {
          id
        }
        created_at
        updated_at
        is_seen
        user {
          id
          name
          status
        }
      }
    }
  }
`;

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private http: HttpClient, private apollo: Apollo) {
    }

    getDialogs(): Observable<Array<IDialogListItem>> {
        return this.http.get<Array<IDialogListItem>>(
            `${environment.baseUrl}/chat/thread/threads`,
        );
    }

    getMessages(
        conversationId: number,
        mid?: number,
        dir?: 'up' | 'down',
    ): Observable<Array<IMessage>> {
        return this.http.get<Array<IMessage>>(
            `${environment.baseUrl}/chat/thread/conversation/${conversationId}`,
            mid ? {params: {mid: String(mid), dir: dir || 'up'}} : undefined,
        );
    }

    // loadFiles(fileList: Array<File>): Observable<Array<{ id: number }>> {
    //   const data = new FormData();
    //   fileList.forEach(file => data.append('files[]', file));
    //   console.log(data);

    //   return this.http.post<Array<{ id: number }>>(
    //     `${environment.baseUrl}/chat/message/files`,
    //     data,
    //   );
    // }
    loadFile(file: File): Observable<number> {
        const data = new FormData();
        data.append('file', file);
        return this.http.post<number>(
            `${environment.baseUrl}/chat/message/file`,
            data,
        );
    }

    loadVoice(file: File): Observable<number> {
        const data = new FormData();
        data.append('voice', file, 'Voice Message');
        return this.http.post<number>(
            `${environment.baseUrl}/chat/message/voice`,
            data,
        );
    }

    sendMessage(
        message: IMessageRequest,
        receiver_id: number,
    ): Observable<number> {
        return this.http.post<number>(`${environment.baseUrl}/chat/message/send`, {
            ...message,
            receiver_id,
        });
    }

    globalSearch(q: string): Observable<Array<IDialogUser>> {
        return this.http
            .get(`${environment.baseUrl}/chat/search/jump`, {
                params: {
                    q,
                },
            })
            .pipe(map((resp: { data: Array<IDialogUser> }) => resp.data));
    }

    gqlGlobalSearch(q: string) {
        return this.apollo
            .query({
                query: search,
                variables: {
                    q,
                },
            })
            .pipe(
                map(res => res.data),
                map(
                    (data: {
                        getFulltextMessages: Array<{
                            conversation_id: number;
                            user: [{ id: number; name: string }];
                            status: string;
                            created_at: string;
                            updated_at: string;
                            message: [{ id: string; message: string }];
                            messages: [
                                {
                                    id: number;
                                    message: string;
                                    is_seen: string;
                                    conversation: {
                                        id: number;
                                    };
                                    created_at: string;
                                    updated_at: string;
                                    user: [
                                        {
                                            id: string;
                                            name: string;
                                            status: string;
                                        }
                                        ];
                                }
                                ];
                        }>;
                    }) => data.getFulltextMessages,
                ),
                map(
                    (data): Array<IDialogListItem | any> =>
                        data.map(item => {
                            const newItem: IDialogListItem = {
                                conversation_id: 0,
                                message: '',
                                file: '',
                                voice: '',
                                updated_at: '', // Date
                                user: {
                                    ...item.user[0],
                                    is_online: false,
                                },
                                is_seen: false,
                            };
                            newItem.message = item.message[0].message;
                            newItem.conversation_id = Number(item.conversation_id);
                            newItem.updated_at = item.updated_at;

                            newItem.filterMessageList = item.messages.map(mes => {
                                const newMes: IMessage = {
                                    id: mes.id,
                                    message: mes.message,
                                    user_id: Number(mes.user[0].id),
                                    conversation_id: item.conversation_id,
                                    files: [],
                                    voices: [],
                                    created_at: mes.created_at,
                                    updated_at: mes.updated_at,
                                };
                                return newMes;
                            });
                            // .map(mes =>
                            //   Number(mes.id),
                            // );
                            return newItem;
                        }),
                ),
            );
    }
}
