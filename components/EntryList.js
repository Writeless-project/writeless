import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, List, ListItem } from 'native-base';
import Swipeout from 'react-native-swipeout';

const renderList = (entries, navigation) => {
    if (entries) {
        function callDeleteEntry() {
            deleteEntry(this.id);
        }

        function callEditEntry() {
            navigation.navigate('EditEntry', this);
        }

        return entries.map((entry, i) => {
            // the buttons that appear when the item is swiped to the left
            var swipeoutBtns = [{
                text: 'Edit',
                backgroundColor: '#a6a6a6',
                onPress: callEditEntry.bind(entry)
            }, {
                text: 'Delete',
                backgroundColor: '#dd0000',
                onPress: callDeleteEntry.bind(entry)
            }];

            return (
                <Swipeout key={i} right={swipeoutBtns} sensitivity={100} autoClose={true}>
                    <ListItem style={styles.listItem}> 
                        <Text>
                            {entry.title || "No entries. Please press the Add button below to add an entry!"}
                        </Text>
                    </ListItem>
                </Swipeout>
            )
        });
    }
}

const EntryList = ({ entries, navigation }) => {
    return (
        <List>
            {renderList(entries, navigation)}
        </List>
    )
}

EntryList.defaultProps = {
    entries: []
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default EntryList;
