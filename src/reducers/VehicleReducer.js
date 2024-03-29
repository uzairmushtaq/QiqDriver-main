import * as Actions from '../actions/ActionTypes'
const VehicleReducer = (state = { vehicle_name:'', vehicle_brand:'', vehicle_color:'', vehicle_number:'', vehicle_type:'', vehicle_type_lbl:'' }, action) => {
    switch (action.type) {
        case Actions.UPDATE_VEHICLE_NAME:
            return Object.assign({}, state, {
                vehicle_name: action.data
            });
        case Actions.UPDATE_VEHICLE_BRAND:
            return Object.assign({}, state, {
                vehicle_brand: action.data
            });
        case Actions.UPDATE_VEHICLE_COLOR:
            return Object.assign({}, state, {
                vehicle_color: action.data
            });
        case Actions.UPDATE_VEHICLE_NUMBER:
            return Object.assign({}, state, {
                vehicle_number: action.data
            });
        case Actions.UPDATE_VEHICLE_TYPE:
            return Object.assign({}, state, {
                vehicle_type: action.data
            });
        case Actions.UPDATE_VEHICLE_TYPE_LBL:
            return Object.assign({}, state, {
                vehicle_type_lbl: action.data
            });
        default:
            return state;
    }
}

export default VehicleReducer