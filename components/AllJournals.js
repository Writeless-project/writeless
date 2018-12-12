import React from 'react';
import JournalList from '../containers/JournalList';
import DeleteJournals from '../containers/DeleteJournals';
import {Container, Content } from 'native-base';


export default class AllJournals extends React.Component {
    constructor(props) {
        super(props); // must use super function to access 'this' in the constructor
        this.props.fetchAllJournals(); // add journals to this.props by getting them fromn AsyncStorage
    }

    render() {
        const { journals } = this.props.state;
        const { navigation } = this.props;
        return (
            <Container>
                <Content>
                    <JournalList journals={journals || [{}]} navigation={navigation}/>
                    <DeleteJournals />
                </Content>
            </Container>
        );
    }
}
