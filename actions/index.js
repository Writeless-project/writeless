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

const _editEntry = entries => {
    return {
        type: actionTypes.EDIT_ENTRY,
        entries: entries
    }
};

export const editEntry = (formValues, selectedEntry) => {
    return async (dispatch) => {
        try {
            let skipUpdate = false;
            // if we can access the state here, we won't need to get the journals again here
            let entries = JSON.parse(await AsyncStorage.getItem(`Entries${selectedEntry.journalId}`)) || [];
            
            // only keep the journal that matches the clicked on journal's id
            entries = entries.map(currEntry => {
                // if it's the editted journal, return the new content
                if (currEntry.id === selectedEntry.id) {
                    // check if the journals are equivalent. If so, no changes are needed
                    if (currEntry.title === formValues.title && 
                        currEntry.content === formValues.content) {
                            // set skipUpdate to true to avoid setting the data again
                            skipUpdate = true;
                            return currEntry;
                    }
                    // if the journal has changed, return the updated journal
                    return {
                        journalId: currEntry.journalId,
                        id: currEntry.id,
                        title: formValues.title || new Date().toDateString(),
                        content: formValues.content,
                        createdAt: currEntry.createdAt
                    }
                }
                // else return the already existing content
                return currEntry;
            });

            // if skipUpdate is false, don't update the state or AsyncStorage
            if (!skipUpdate) {
                await AsyncStorage.setItem(`Entries${selectedEntry.journalId}`, JSON.stringify(entries)); // set the journals in AsyncStorage
                dispatch(_editEntry(entries)); // set the journals in the state
            }
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

export const deleteEntry = (entry) => {
    return async (dispatch) => {
        try {
            // if we can access the state here, we won't need to get the entries again here
            let entries = JSON.parse(await AsyncStorage.getItem(`Entries${entry.journalId}`));

            // only keep the entries that aren't the deleted entry
            entries = entries.filter(currEntry => currEntry.id !== entry.id);

            await AsyncStorage.setItem(`Entries${entry.journalId}`, JSON.stringify(entries)); // set the entries in AsyncStorage
            dispatch(_deleteEntry(entries)); // set the entries in the state
        } catch (err) {
            console.error(err);
        }
    }
};

const _deleteEntries = () => {
    return {
        type: actionTypes.DELETE_ENTRIES,
        entries: []
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
            let date = new Date();

            journals.push({
                id: Date.now(),
                title: journal.title || date.toDateString(),
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
                // if it's the edited journal, return the new content
                // as soon as we have properties other than title we'll have to loop through keys & compare dynamically
                if (currJournal.id === selectedJournal.id && currJournal.title != formValues.title) {
                    return {
                        id: currJournal.id,
                        title: formValues.title || new Date().toDateString(),
                        createdAt: currJournal.createdAt
                    }
                } else {
                    // else return the already existing content
                    skipUpdate = true;
                    return currJournal;
                }
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
        type: actionTypes.DELETE_JOURNALS,
        journals: []
    }
};

export const deleteJournals = () => {
    return async (dispatch) => {
        try {
            let allKeys = await AsyncStorage.getAllKeys()
            for (let i = 0; i < allKeys.length; i++) {
                await AsyncStorage.removeItem(allKeys[i]);
            }
            dispatch(_deleteJournals()); // remove the journals from the state
        } catch (err) {
            console.error(err);
        }
    }
};

const _fetchAllEntries = entries => {
    return {
        type: actionTypes.RECEIVE_ENTRIES,
        entries: entries
    }
}; 

export const fetchAllEntries = (selectedJournal) => {
    return async dispatch => {
        try {
            const entries = await AsyncStorage.getItem(`Entries${selectedJournal.id}`);
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
