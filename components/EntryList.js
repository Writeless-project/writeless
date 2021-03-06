import React from 'react';
import { StyleSheet, AlertIOS, Share } from 'react-native';
import { Text, List, ListItem } from 'native-base';
import Swipeout from 'react-native-swipeout';

const renderList = (entries, navigation, deleteEntry) => {
    if (entries) {
        function confirmDelete() {
            const entry = this;
            
            AlertIOS.alert(
                'Confirm Delete',
                `Are you sure you would like to delete ${entry.title}?`,
                [
                  {
                    text: 'Cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deleteEntry(entry),
                    style: 'destructive',
                  },
                ],
              );
        }

        function callEditEntry() {
            navigation.navigate('EditEntry', this);
        }

        function shareEntry() {
            Share.share({
                message: `${this.title}\n${this.content}`,
                url: undefined,
                title: this.title
            }, {
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToFacebook'
                  ]
            });
        }

        function viewEntry() {
            navigation.navigate('ViewEntry', this)
        }

        return entries.map((entry, i) => {
            // the buttons that appear when the item is swiped to the left
            var swipeoutBtns = [{
                text: 'Share',
                backgroundColor: '#5bc0de',
                onPress: shareEntry.bind(entry)
            }, {
                text: 'Edit',
                backgroundColor: '#a6a6a6',
                onPress: callEditEntry.bind(entry)
            }, {
                text: 'Delete',
                backgroundColor: '#dd0000',
                onPress: confirmDelete.bind(entry)
            }];

            return (
                <Swipeout key={i} right={swipeoutBtns} style={styles.swipeout} sensitivity={50} autoClose={true}>
                    <ListItem style={styles.listItem} onPress={viewEntry.bind(entry)}> 
                        <Text>
                            {entry.title || "No entries. Please press the Add button below to add an entry!"}
                        </Text>
                    </ListItem>
                </Swipeout>
            )
        });
    }
}

const EntryList = ({ entries, navigation, deleteEntry }) => {
    return (
        <List>
            {renderList(entries, navigation, deleteEntry)}
        </List>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, swipeout: {
        backgroundColor: 'white'
    }
});

export default EntryList;
