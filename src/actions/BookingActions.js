import * as ActionTypes from './ActionTypes';

export const initialLat = (data) => ({
    type: ActionTypes.INITIAL_LAT,
    data: data
})

export const initialLng = (data) => ({
    type: ActionTypes.INITIAL_LNG,
    data: data
})

export const initialRegion = (data) => ({
    type: ActionTypes.INITIAL_REGION,
    data: data
})

