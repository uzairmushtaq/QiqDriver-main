import * as Actions from '../actions/ActionTypes'
const ChangeLocationReducer = (state = { change_location: undefined }, action) => {

    switch (action.type) {
        case Actions.CHANGE_LOCATION:
            return Object.assign({}, state, {
                change_location: action.data
            });

        default:
            return state;
    }
}

export default ChangeLocationReducer;
