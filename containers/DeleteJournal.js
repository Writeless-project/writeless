import { connect } from 'react-redux';
import { deleteJournal } from '../actions';
import DeleteJournal from '../components/DeleteJournal';

const mapDispatchToProps = dispatch => {
    return {
        deleteJournal: () => {
            dispatch(deleteJournal());
        }
    }
}

const DeleteJournalContainer = connect(
    null,
    mapDispatchToProps
)(DeleteJournal);

export default DeleteJournalContainer;