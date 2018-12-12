import { connect } from 'react-redux';
import { addEntry } from '../actions';
import AddEntry from '../components/AddEntry';

const mapDispatchToProps = dispatch => {
    return {
        addEntry: (entry,selectedJournal) => {
            dispatch(addEntry(entry, selectedJournal));
        }
    }
}

const AddEntryContainer = connect(
    null,
    mapDispatchToProps
)(AddEntry);

export default AddEntryContainer;