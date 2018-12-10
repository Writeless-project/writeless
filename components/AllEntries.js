import React from 'react';
import EntryList from '../containers/EntryList';
import {Container, Content } from 'native-base';


export default class AllEntries extends React.Component {
    constructor(props) {
        super(props); // must use super function to access 'this' in the constructor
        selectedJournal = this.props.navigation.state.params;
        this.props.fetchAllEntries(selectedJournal); // add entries to this.props by getting them from AsyncStorage
    }

    render() {
        return (
            <Container>
                <Content>
                    <EntryList 
                        entries={this.props.entries || [{}]} 
                        navigation={this.props.navigation}/>
                </Content>
            </Container>
        );
    }
}
