import {
    ADD_ENTRY,
    ADD_JOURNAL,
    UPDATE_JOURNAL,
    DELETE_JOURNAL,
    DELETE_JOURNALS,
    FETCH_ALL_JOURNALS,
    RECEIVE_JOURNALS
} from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';

export const saveJournals = async state => {
    try {
        await AsyncStorage.setItem('Journals', JSON.stringify(state));
    } catch (err) {
        console.error(`Error (saveJournals): ${err.message}`);
    }
};

export const deleteJournals = async () => {
    try {
        await AsyncStorage.removeItem('Journals');
    } catch (err) {
        console.error(`Error (deleteJournals): ${err.message}`);
    }
}

export const deleteJournal = async () => {
    try {
        // Insert fun asyncStorage logic here
        console.log(`Delete a journal here`);
    } catch (err) {
        console.error(`Error (deleteJournal): ${err.message}`);
    }
}

const Journal = (state, action) => {
    switch (action.type) {
        case ADD_JOURNAL:
            return {
                id: action.id,
                title: action.payload.title,
                content: action.payload.content,
                createdAt: new Date()
            }
        default:
            return state;
    }
};

const AddEntry = (state, action) => {
    switch (action.type) {
        case ADD_JOURNAL:
            if (!state) {
                state = [];
            }
            const journals = [...state, Journal(null, action)];
            saveEntry(journals);
            return journals;
        case RECEIVE_JOURNALS:
            return action.payload;
        case DELETE_JOURNALS:
            deleteJournals();
            return;
        default:
            return state;
    }
};

const AddJournal = (state, action) => {
    switch (action.type) {
        case ADD_JOURNAL:
            if (!state) {
                state = [];
            }
            const journals = [...state, Journal(null, action)];
            saveJournals(journals);
            return journals;
        case RECEIVE_JOURNALS:
            return action.payload;
        case DELETE_JOURNALS:
            deleteJournals();
            return;
        case DELETE_JOURNAL:
            deleteJournal();
            return;
        default:
            return state;
    }
};

export default AddJournal;