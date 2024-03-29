import * as ActionTypes from './ActionTypes';

export const updatePhoneNumber = (data) => ({
    type: ActionTypes.UPDATE_PHONE_NUMBER,
    data: data
})

export const updatePhoneWithCode = (data) => ({
    type: ActionTypes.UPDATE_PHONE_WITH_CODE,
    data: data
})

export const updateCountryCode = (data) => ({
    type: ActionTypes.UPDATE_COUNTRY_CODE,
    data: data
})

export const updateFirstName = (data) => ({
    type: ActionTypes.UPDATE_FIRST_NAME,
    data: data
})

export const updateLastName = (data) => ({
    type: ActionTypes.UPDATE_LAST_NAME,
    data: data
})

export const updateEmail = (data) => ({
    type: ActionTypes.UPDATE_EMAIL,
    data: data
})

export const updateLicenceNumber = (data) => ({
    type: ActionTypes.UPDATE_LICENCE_NUMBER,
    data: data
})

export const updateDateOfBirth = (data) => ({
    type: ActionTypes.UPDATE_DATE_OF_BIRTH,
    data: data
})