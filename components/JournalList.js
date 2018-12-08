import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, List, ListItem } from 'native-base';
import Swipeout from 'react-native-swipeout';

const renderList = (journals, navigation, deleteJournal) => {
    if (journals) {
        function callDeleteJournal() {
            deleteJournal(this.id);
        }

        function callEditJournal() {
            navigation.navigate('EditJournal', this);
        }

        return journals.map((journal, i) => {
            // the buttons that appear when the item is swiped to the left
            var swipeoutBtns = [{
                text: 'Edit',
                backgroundColor: '#a6a6a6',
                onPress: callEditJournal.bind(journal)
            }, {
                text: 'Delete',
                backgroundColor: '#dd0000',
                onPress: callDeleteJournal.bind(journal)
            }];

            return (
                <Swipeout key={i} 
                right={swipeoutBtns} 
                sensitivity={100} 
                autoClose={true} 
                style={{backgroundColor:'white'}}>
                    <ListItem style={styles.listItem} onPress={() => console.log(`Pressed ${journal.title || "No journals"}`)}>
                        <Text>
                            {journal.title || "No journals. Please press the Add button below to add a journal!"}
                        </Text>
                    </ListItem>
                </Swipeout>
            )
        });
    }
}

const JournalList = ({ journals, navigation, deleteJournal }) => {
    return (
        <List>
            {renderList(journals, navigation, deleteJournal)}
        </List>
    )
}

JournalList.defaultProps = {
    journals: []
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default JournalList;