import * as actionTypes from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';

export const deleteJournals = async () => {
    try {
        await AsyncStorage.removeItem('Journals');
    } catch (err) {
        console.error(`Error (deleteJournals): ${err.message}`);
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_JOURNAL:
            return action.journals;
        case actionTypes.RECEIVE_JOURNALS:
            return action.journals;
        case actionTypes.EDIT_JOURNAL:
            return action.journals;
        case actionTypes.DELETE_JOURNALS:
            return; // we might need to return something here
        case actionTypes.DELETE_JOURNAL:
            return action.journals;
        // create a second reducer function/ file here
        case actionTypes.ADD_ENTRY:
            return action.entries;
        case actionTypes.RECEIVE_ENTRIES:
            return action.entries;
        case actionTypes.EDIT_ENTRY:
            return action.entries;
        case actionTypes.DELETE_ENTRY:
            return action.entries;
        case actionTypes.DELETE_ENTRIES:
            return action.entries;
        default:
            return state;
    }
};
