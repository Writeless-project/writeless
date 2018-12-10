import * as actionTypes from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';
import { DatePicker } from 'native-base';

const _addJournal = journals => {
    return {
        type: actionTypes.ADD_JOURNAL,
        journals: journals
    }
};

export const addJournal = (journal) => {
    return async (dispatch) => {
        try {
            // if we can access the state here, we won't need to get the journals again here
            let journals = JSON.parse(await AsyncStorage.getItem('Journals')) || [];
            
            // add the new journal here instead of in the reducer, because of the async await needed to set AsyncStorage
            let date = new Date();

            journals.push({
                id: Date.now(),
                title: journal.title || date.toDateString(),
                content: journal.content,
                createdAt: date
            });

            await AsyncStorage.setItem('Journals', JSON.stringify(journals)); // set the journals in AsyncStorage
            dispatch(_addJournal(journals)); // set the journals in the state
        } catch (err) {
            console.error(err);
        }
    }
};

const _editJournal = journals => {
    return {
        type: actionTypes.EDIT_JOURNAL,
        journals: journals
    }
};

export const editJournal = (formValues, selectedJournal) => {
    return async (dispatch) => {
        try {
            let skipUpdate = false;
            // if we can access the state here, we won't need to get the journals again here
            let journals = JSON.parse(await AsyncStorage.getItem('Journals')) || [];
            
            // only keep the journal that matches the clicked on journal's id
            journals = journals.map(currJournal => {
                // if it's the editted journal, return the new content
                if (currJournal.id === selectedJournal.id) {
                    // check if the journals are equivalent. If so, no changes are needed
                    if (currJournal.title === formValues.title && 
                        currJournal.content === formValues.content) {
                            // set skipUpdate to true to avoid setting the data again
                            skipUpdate = true;
                            return currJournal;
                    }
                    // if the journal has changed, return the updated journal
                    return {
                        id: currJournal.id,
                        title: formValues.title || JSON.stringify(new Date()),
                        content: formValues.content,
                        createdAt: currJournal.createdAt
                    }
                }
                // else return the already existing content
                return currJournal;
            });

            // if skipUpdate is false, don't update the state or AsyncStorage
            if (!skipUpdate) {
                await AsyncStorage.setItem('Journals', JSON.stringify(journals)); // set the journals in AsyncStorage
                dispatch(_editJournal(journals)); // set the journals in the state
            }
        } catch (err) {
            console.error(err);
        }
    }
};

const _deleteJournal = journals => {
    return {
        type: actionTypes.DELETE_JOURNAL,
        journals: journals,
    }
};

export const deleteJournal = (id) => {
    return async (dispatch) => {
        try {
            // if we can access the state here, we won't need to get the journals again here
            let journals = JSON.parse(await AsyncStorage.getItem('Journals'));

            // only keep the journals that aren't the deleted journal
            journals = journals.filter(journal => journal.id !== id);

            await AsyncStorage.setItem('Journals', JSON.stringify(journals)); // set the journals in AsyncStorage
            dispatch(_deleteJournal(journals)); // set the journals in the state
        } catch (err) {
            console.error(err);
        }
    }
};

const _deleteJournals = () => {
    return {
        type: actionTypes.DELETE_JOURNALS
    }
};

export const deleteJournals = () => {
    return async (dispatch) => {
        try {
            await AsyncStorage.removeItem('Journals'); // remove the journals from AsyncStorage
            dispatch(_deleteJournals()); // remove the journals from the state
        } catch (err) {
            console.error(err);
        }
    }
};

const _fetchAllJournals = journals => {
    return {
        type: actionTypes.RECEIVE_JOURNALS,
        journals: journals
    }
}; 

export const fetchAllJournals = () => {
    return async dispatch => {
        try {
            const journals = await AsyncStorage.getItem('Journals');
            dispatch(_fetchAllJournals(JSON.parse(journals)));
        } catch (err) {
            console.error(err);
        }
    }
};
