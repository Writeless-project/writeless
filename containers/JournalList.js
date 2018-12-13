import { connect } from 'react-redux';
import { deleteJournal, fetchAllEntries } from '../actions';
import { JournalList } from '../components/JournalList';

const mapDispatchToProps = state => {
    return {
        state
    };
};

const mapStateToProps = dispatch => {
    return {
        deleteJournal: id => {
            dispatch(deleteJournal(id));
        },
        fetchAllEntries: selectedJournal => {
            dispatch(fetchAllEntries(selectedJournal));
        }
    }
};

const JournalListContainer = connect(
    mapDispatchToProps,
    mapStateToProps
)(JournalList);

export default JournalListContainer;