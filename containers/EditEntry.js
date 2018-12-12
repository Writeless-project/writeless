import { connect } from 'react-redux';
import { editEntry } from '../actions';
import EditEntry from '../components/EditEntry';

const mapDispatchToProps = dispatch => {
    return {
        editEntry: (formValues, entry)=> {
            dispatch(editEntry(formValues, entry));
        }
    }
}

const EditEntryContainer = connect(
    null,
    mapDispatchToProps
)(EditEntry);

export default EditEntryContainer;