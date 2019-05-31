import {IcoActions, IcoActionTypes} from '../actions/ico.actions';
import {IIco} from '../../ico/interfaces/ico.interface';
import {IMeta} from '../interfaces/user-for-admin.interface';

export interface State {
    icos: Array<IIco>;
    meta?: IMeta;
}

export const initialState: State = {
    icos: [],
};

export function reducer(state = initialState, action: IcoActions): State {
    switch (action.type) {
        case IcoActionTypes.LoadIcoSuccess:
            return {
                ...state,
                icos:
                    action.payload.meta.current_page !== 1
                        ? [...state.icos, ...action.payload.data]
                        : action.payload.data,
                meta: action.payload.meta,
            };
        case IcoActionTypes.LoadIcoFail:
            return {...state};
        case IcoActionTypes.DeleteIcoLocal:
            return {
                ...state,
                icos: state.icos.filter(e => !(e.id && e.id === action.payload)),
            };
        case IcoActionTypes.DeleteIcoSuccess:
            return {
                ...state,
                icos: state.icos.filter(e => !(e.id && e.id === action.payload)),
            };
        case IcoActionTypes.AddLocalIco:
            return {
                ...state,
                icos: [
                    ...state.icos,
                    <IIco>{
                        id: action.payload,
                        email: '',
                        ico: 'Premium (Top Picks)',
                        project: '',
                        contact: '',
                        logo: '',
                        start_date: '',
                        end_date: '',
                        pre_ico_start: '',
                        pre_ico_end: '',
                        website: '',
                        whitepaper: '',
                        telegram: '',
                        twitter: '',
                        facebook: '',
                        bitcointalk: '',
                        description: '',
                        line_description: '',
                        link_team: '',
                        video_link: '',
                        ico_soft_cap: '',
                        ico_hard_cap: '',
                        token_symbol: '',
                        token_type: '',
                        token_prices: '',
                        customer: 0,
                        intend: 0,
                        accept_currencies: '',
                        restricted_countries: '',
                        ico_location: '',
                        isNew: true,
                    },
                ],
            };
        default:
            return state;
    }
}
