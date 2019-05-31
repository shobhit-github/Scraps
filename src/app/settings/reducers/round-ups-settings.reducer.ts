import {
    RoundUpsSettingsActions,
    RoundUpsSettingsActionTypes,
} from '../actions/round-ups-settings.actions';
import {IStripeCard} from 'src/app/invest/interfaces/stripe-card.interface';
import {ERoundUpsStatus} from '../interfaces/round-ups-settings.interfaces';

export interface State {
    cardList: Array<IStripeCard>;
    usedCard?: IStripeCard;
    tmpCard?: IStripeCard;
    status: ERoundUpsStatus;
    pending?: {
        card: boolean;
        status: boolean;
    };
}

export const initialState: State = {
    cardList: [],
    status: ERoundUpsStatus.closed,
    pending: {
        card: false,
        status: false,
    },
};

export function reducer(
    state = initialState,
    action: RoundUpsSettingsActions,
): State {
    switch (action.type) {
        case RoundUpsSettingsActionTypes.LoadSuccess:
            return {...state, ...action.payload};
        case RoundUpsSettingsActionTypes.SetCard:
            return {...state, tmpCard: action.payload};
        case RoundUpsSettingsActionTypes.Save:
            return {
                ...state,
                pending: {...state.pending, card: true},
            };
        case RoundUpsSettingsActionTypes.SaveSuccess:
            return {
                ...state,
                usedCard: action.payload,
                pending: {...state.pending, card: false},
            };
        case RoundUpsSettingsActionTypes.SaveFail:
            return {...state, pending: {...state.pending, card: false}};
        case RoundUpsSettingsActionTypes.SetStatus:
            return {...state, pending: {...state.pending, status: true}};
        case RoundUpsSettingsActionTypes.SetStatusSuccess:
            return {
                ...state,
                status: action.payload,
                pending: {...state.pending, status: false},
            };
        case RoundUpsSettingsActionTypes.SetStatusFail:
            return {...state, pending: {...state.pending, status: false}};

        default:
            return state;
    }
}
