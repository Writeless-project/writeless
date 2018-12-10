import * as actionTypes from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';

const _addEntry = entries => {
    return {
        type: actionTypes.ADD_ENTRY,
        entries: entries
    }
};

export const addEntry = (entry, selectedJournal) => {
    return async (dispatch) => {
        try {
            console.log('addEntry', selectedJournal)
            // if we can access the state here, we won't need to get the entries again here
            let entries = JSON.parse(await AsyncStorage.getItem(`Entries${selectedJournal.id}`)) || [];
            
            // add the new entries here instead of in the reducer, because of the async await needed to set AsyncStorage
            entries.push({
                journalId: selectedJournal.id,
                id: Date.now(),
                title: entry.title || new Date().toDateString(),
                content: entry.content,
                createdAt: new Date()
            });

            await AsyncStorage.setItem(`Entries${selectedJournal.id}`, JSON.stringify(entries)); // set the entries in AsyncStorage
            dispatch(_addEntry(entries)); // set the entries in the state. This is what gets sent to the store, and the store sends the state and the parameters to the reducer
        } catch (err) {
            console.error(err);
        }
    }
};


const _deleteEntry = entries => {
    return {
        type: actionTypes.DELETE_ENTRY,
        entries: entries
    }
};

export const deleteEntry = (id) => {
    return async (dispatch) => {
        try {
            // if we can access the state here, we won't need to get the entries again here
            let entries = JSON.parse(await AsyncStorage.getItem('Entries'));

            // only keep the entries that aren't the deleted entry
            entries = entries.filter(entry => entry.id !== id);

            await AsyncStorage.setItem('Entries', JSON.stringify(entries)); // set the entries in AsyncStorage
            dispatch(_deleteEntry(entries)); // set the entries in the state
        } catch (err) {
            console.error(err);
        }
    }
};

const _deleteEntries = () => {
    console.log('deleting Entries')
    return {
        type: actionTypes.DELETE_ENTRIES
    }
};

export const deleteEntries = (id) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.removeItem(`Entries${id}`); // remove the entries from AsyncStorage
            dispatch(_deleteEntries()); // remove the entries from the state
        } catch (err) {
            console.error(err);
        }
    }
};

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
            journals.push({
                id: Date.now(),
                title: journal.title || JSON.stringify(new Date()),
                content: journal.content,
                createdAt: new Date()
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
            // delete the entries from the journal first
            deleteEntries(id);

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

const _fetchAllEntries = entries => {
    console.log('dispatched')
    return {
        type: actionTypes.RECEIVE_ENTRIES,
        entries: entries
    }
}; 

export const fetchAllEntries = (selectedJournal) => {
    return async dispatch => {
        try {
            console.log('in action', selectedJournal)
            const entries = await AsyncStorage.getItem(`Entries${selectedJournal.id}`);
            console.log('in action entries', entries)
            dispatch(_fetchAllEntries(JSON.parse(entries)));
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
