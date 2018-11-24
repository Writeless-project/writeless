import { 
    ADD_ENTRY,
    ADD_JOURNAL, 
    UPDATE_JOURNAL,
    DELETE_JOURNAL,
    DELETE_JOURNALS,
    FETCH_ALL_JOURNALS,
    RECEIVE_JOURNALS } from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';

export const addEntry = (entry, journal) => {
    return {
        type: ADD_ENTRY,
        id: Date.now(),
        payload: {entry, journal}
    }
};

export const addJournal = journal => {
    return {
        type: ADD_JOURNAL,
        id: Date.now(),
        payload: journal
    }
};

export const receiveJournals = journals => {
    return {
        type: RECEIVE_JOURNALS,
        payload: journals
    }
}; 

export const deleteJournals = () => {
    return {
        type: DELETE_JOURNALS
    }
};

export const deleteJournal = () => {
    return {
        type: DELETE_JOURNAL
    }
};

export const fetchAllJournals = () => {
    return dispatch => {
        return AsyncStorage.getItem('Journals')
            .then(journals => {
                dispatch(receiveJournals(JSON.parse(journals)));
            });
    }
};
