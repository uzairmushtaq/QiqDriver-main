import * as Actions from '../actions/ActionTypes'
const PaymentReducer = (state = { paypal_payment_status: 0 }, action) => {

    switch (action.type) {
        case Actions.PAYPAL_PAYMENT_STATUS:
            return Object.assign({}, state, {
                paypal_payment_status: action.data
            });

        default:
            return state;
    }
}

export default PaymentReducer;
