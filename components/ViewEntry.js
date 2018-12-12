import React from 'react';
import {
    View,
    StyleSheet,
    Keyboard
} from 'react-native';
// import { Formik } from 'formik';
import { Text, Button, Item, Input, Form } from 'native-base';

const ViewEntry = (props) => {
    const navigation = props.navigation;
    const selectedEntry = props.navigation.state.params;
    
    return (
        <View>
            <Item>
                <Text>{selectedEntry.title}</Text>
            </Item>
            <Item>
            <Text>{selectedEntry.content}</Text>
            </Item>
            {/* <Button title={'Go Back'} onPress={() => navigation.goBack()}/>                     */}
        </View>
    )
};

/* Because native-base doesn't have any margins for some reason */
// const styles = StyleSheet.create({
//     button: {
//         marginTop: 20,
//         margin: 20,
//     }
// });

export default ViewEntry;
