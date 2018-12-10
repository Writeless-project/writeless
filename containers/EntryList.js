import { connect } from 'react-redux';
import { deleteEntry } from '../actions';
import EntryList from '../components/EntryList';

const mapDispatchToProps = dispatch => {
    return {
        deleteEntry: id => {
            dispatch(deleteEntry(id));
        }
    }
}

const EntryListContainer = connect(
    null,
    mapDispatchToProps
)(EntryList);

export default EntryListContainer;