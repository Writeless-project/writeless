import { connect } from 'react-redux';
import { fetchAllJournals } from '../actions';
import AllJournals from '../components/AllJournals';

const mapDispatchToProps = state => {
    return {
        state
    };
};

const mapStateToProps = dispatch => {
    return {
        fetchAllJournals: () => {
            dispatch(fetchAllJournals());
        }
    }
};

const AllJournalContainer = connect(
    mapDispatchToProps,
    mapStateToProps
)(AllJournals);

export default AllJournalContainer;