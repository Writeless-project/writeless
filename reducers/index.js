import * as actionTypes from '../constants/ActionTypes';
import { combineReducers } from 'redux';

function journals(previousState = [], action) {
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
        default:
            return previousState;
    }
};

function entries(previousState = [], action) {
    switch (action.type) {
        case actionTypes.ADD_ENTRY:
            return action.entries;
        case actionTypes.RECEIVE_ENTRIES:
            return action.entries;
        case actionTypes.EDIT_ENTRY:
            return action.entries;
        case actionTypes.DELETE_ENTRY:
            return action.entries;
        case actionTypes.DELETE_ENTRIES:
            return // we might need to return something here;
        default:
            return previousState;
    }
}

const journalApp = combineReducers({
    journals,
    entries
});

export default journalApp;
