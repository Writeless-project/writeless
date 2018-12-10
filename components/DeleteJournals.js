import React from 'react';
import { StyleSheet, AlertIOS } from 'react-native';
import {
    Button,
    Text
} from 'native-base';

const DeleteJournals = ({enabled, deleteJournals}) => {

    function confirmDeleteAll() {
            AlertIOS.alert(
                'Confirm Delete',
                `Are you sure you would like to delete all journals?`,
                [
                  {
                    text: 'Cancel'
                },
                {
                    text: 'Confirm',
                    onPress: deleteJournals,
                    style: 'destructive',
                  },
                ],
              );
    }


    return (
        <Button danger style={styles.button} disabled={!enabled} full onPress={confirmDeleteAll}>
            <Text>Delete All Journals</Text>
        </Button>
    )
};

/* Because the default margin-top is 200.... */
const styles = StyleSheet.create({
    button: {
        marginTop: 40,
        margin: 20,
    }
});

export default DeleteJournals;