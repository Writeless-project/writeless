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
import { fetchAllJournals } from '../actions';

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

export const deleteJournal = async (state, action) => {
    try {
        
        /* get all Journals from async storage */
        var journals = JSON.parse(await AsyncStorage.getItem('Journals'));
        /* filter by ID */
        journals = JSON.stringify(journals.filter(journal => journal.id !== action.payload.journalId));

        /* merge new Jourals item to asyncStorage */
        await AsyncStorage.removeItem('Journals');
        await AsyncStorage.setItem('Journals', journals);
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
                createdAt: new Date(),
                entries: []
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
            console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
            console.log(state);
            console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');

            console.log('----------------------------------');
            console.log(action.payload);
            console.log('----------------------------------');

            let j = Journal(null, action);
            const journals = {...state, j};
            saveJournals(journals);
            return journals;
        case RECEIVE_JOURNALS:
            return action.payload;
        case DELETE_JOURNALS:
            const noMoreJournals = {};
            saveJournals(noMoreJournals);
            return noMoreJournals;
        case DELETE_JOURNAL:
            deleteJournal(state, action);
            return;
        default:
            return state;
    }
};

export default AddJournal;