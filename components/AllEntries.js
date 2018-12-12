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
        const { entries } = this.props.state;
        const { navigation } = this.props;

        return (
            <Container>
                <Content>
                    <EntryList 
                        entries={entries || [{}]} 
                        navigation={navigation}/>
                </Content>
            </Container>
        );
    }
}
