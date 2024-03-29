import * as Actions from '../actions/ActionTypes'
const RegisterReducer = (state = { phone_number:undefined, phone_with_code:undefined, country_code:undefined, first_name:undefined, last_name:undefined, email:undefined, licence_number:undefined, date_of_birth:undefined }, action) => {
    switch (action.type) {
        case Actions.UPDATE_PHONE_NUMBER:
            return Object.assign({}, state, {
               phone_number: action.data
            });
        case Actions.UPDATE_PHONE_WITH_CODE:
            return Object.assign({}, state, {
                phone_with_code: action.data
            });
        case Actions.UPDATE_COUNTRY_CODE:
            return Object.assign({}, state, {
                country_code: action.data
            });
        case Actions.UPDATE_FIRST_NAME:
            return Object.assign({}, state, {
                first_name: action.data
            });
        case Actions.UPDATE_LAST_NAME:
            return Object.assign({}, state, {
                last_name: action.data
            });
        case Actions.UPDATE_EMAIL:
            return Object.assign({}, state, {
                email: action.data
            });
        case Actions.UPDATE_LICENCE_NUMBER:
            return Object.assign({}, state, {
                licence_number: action.data
            });
        case Actions.UPDATE_DATE_OF_BIRTH:
            return Object.assign({}, state, {
                date_of_birth: action.data
            });
        default:
            return state;
    }
}

export default RegisterReducer
