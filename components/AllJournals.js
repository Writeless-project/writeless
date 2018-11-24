import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import JournalList from './JournalList';
import AddJournal from '../containers/AddJournal';
import DeleteJournal from '../containers/DeleteJournal';
import DeleteJournals from '../containers/DeleteJournals';
import {Container, Content } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  }
});

class AllJournals extends Component {
    componentDidMount() {
        this._initial();
    }

    _initial() {
        this.props.fetchAllJournals();
    }

    render() {
        const { journals } = this.props;

        return (
            <Container>
                <Content>
                    <AddJournal />
                    <JournalList journals={journals} />
                    <DeleteJournals />
                    <DeleteJournal />
                </Content>
            </Container>
        );
    }
}

export default AllJournals;
