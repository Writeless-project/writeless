import React, { Component } from 'react';
import JournalList from '../containers/JournalList';
import DeleteJournals from '../containers/DeleteJournals';
import {Container, Content } from 'native-base';


class AllJournals extends Component {
    componentDidMount() {
        this._initial();
    }

    _initial() {
        this.props.fetchAllJournals();
    }

    render() {
        console.log('----------------------------')
        console.log(this.props);
        console.log('----------------------------')
        const { journals } = this.props;

        return (
            <Container>
                <Content>
                    <JournalList journals={journals} />
                    <DeleteJournals />
                </Content>
            </Container>
        );
    }
}

export default AllJournals;
