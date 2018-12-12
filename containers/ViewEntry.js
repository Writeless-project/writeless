import { connect } from 'react-redux';
import { viewEntry } from '../actions';
import ViewEntry from '../components/ViewEntry';

const mapDispatchToProps = dispatch => {
    return {
        viewEntry: (entry)=> {
            dispatch(viewEntry(entry));
        }
    }
}

const ViewEntryContainer = connect(
    null,
    mapDispatchToProps
)(ViewEntry);

export default ViewEntryContainer;