import React from 'react';
import JournalList from '../containers/JournalList';
import DeleteJournals from '../containers/DeleteJournals';
import {Container, Content } from 'native-base';


export default class AllJournals extends React.Component {
    constructor(props) {
        super(props); // must use super function to access 'this' in the constructor
        console.log('props', this.props)
        this.props.fetchAllJournals(); // add journals to this.props by getting them fromn AsyncStorage
    }

    render() {
        return (
            <Container>
                <Content>
                    <JournalList journals={this.props.journals || [{}]} navigation={this.props.navigation}/>
                    <DeleteJournals />
                </Content>
            </Container>
        );
    }
}
