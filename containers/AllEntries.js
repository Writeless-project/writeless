import { connect } from 'react-redux';
import { fetchAllEntries } from '../actions';
import AllEntries from '../components/AllEntries';

const mapDispatchToProps = state => {
    return {
        entries: state
    };
};

const mapStateToProps = dispatch => {
    return {
        fetchAllEntries: (selectedJournal) => {
            console.log('during fetch', selectedJournal)
            dispatch(fetchAllEntries(selectedJournal));
        }
    }
};

const AllEntriesContainer = connect(
    mapDispatchToProps,
    mapStateToProps
)(AllEntries);

export default AllEntriesContainer;