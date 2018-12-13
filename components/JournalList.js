import React from 'react';
import { StyleSheet, AlertIOS, Share } from 'react-native';
import { Text, List, ListItem } from 'native-base';
import Swipeout from 'react-native-swipeout';

export class JournalList extends React.Component {
    constructor(props) {
        super(props);
        console.log('propsssss', this.props)
        this.props.fetchAllEntries;
        deleteJournal = this.props.deleteJournal; // can't put in the function it's used in because of binding() to 'this'
        fetchAllEntries = this.props.fetchAllEntries; // can't put in the function it's used in because of binding() to 'this'
        navigation = this.props.navigation; // can't put in the function it's used in because of binding() to 'this'
        this.shareJournal = this.shareJournal.bind(this);
    }
    
    confirmDelete() {
        const journal = this;
        
        AlertIOS.alert(
            'Confirm Delete',
            `Are you sure you would like to delete ${journal.title}?`,
            [
              {
                text: 'Cancel'
            },
            {
                text: 'Confirm',
                onPress: () => deleteJournal(journal.id),
                style: 'destructive',
              },
            ],
          );
    }
    
    callEditJournal() {
        navigation.navigate('EditJournal', this);
    }

    shareJournal(journal) {
        this.props.fetchAllEntries(journal);
        Share.share({
            message: JSON.stringify(this.props.state.entries),
            url: undefined,
            title: journal.title
        });
    }

    openEntryList() {
        navigation.navigate('Entries', this);
    }

    render() {
        if (this.props.journals) {
            return this.props.journals.map((journal, i) => {
                // the buttons that appear when the item is swiped to the left
                var swipeoutBtns = [
                // {
                //     text: 'Share',
                //     backgroundColor: '#5bc0de',
                //     onPress: () => this.shareJournal(journal)
                // }, 
                {
                    text: 'Edit',
                    backgroundColor: '#a6a6a6',
                    onPress: this.callEditJournal.bind(journal)
                }, {
                    text: 'Delete',
                    backgroundColor: '#dd0000',
                    onPress: this.confirmDelete.bind(journal)
                }];

                return (
                    <Swipeout key={i} right={swipeoutBtns} style={styles.swipeout} sensitivity={50} autoClose={true}>
                        <ListItem style={styles.listItem} onPress={this.openEntryList.bind(journal)}> 
                            <Text>
                                {journal.title || "No journals. Please press the Add button below to add a journal!"}
                            </Text>
                        </ListItem>
                    </Swipeout>
                )
            });
        }
    }
}

export default class RenderList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List>
                <JournalList journals={this.props.journals} navigation={this.props.navigation}></JournalList>
            </List>
        );
    }
} 

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20
    },
    swipeout: {
        backgroundColor: 'white'
    }
});

// export default JournalList;
