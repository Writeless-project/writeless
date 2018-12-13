import React from 'react';
import {
    View,
    StyleSheet,
    Keyboard
} from 'react-native';
import { Formik } from 'formik';
import { Text, Button, Item, Input, Form } from 'native-base';

const EditEntry = (props) => {
    const navigation = props.navigation;
    const selectedEntry = props.navigation.state.params;
    
    function onSubmit(formValues) {
        props.editEntry(formValues, selectedEntry);
        navigation.goBack();
    }
    
    return (
        /* Wrapping Formik in a Form for the styling. There's gotta be a better way to do this */
        <Form>
            <Formik 
                onSubmit={onSubmit}
                initialValues={{title: selectedEntry.title, content: selectedEntry.content}} >
                {props => (
                    <View>
                        <Item>
                            <Input 
                                autoFocus
                                placeholder="Entry Name"
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder="Entry content"
                                onChangeText={props.handleChange('content')}
                                value={props.values.content}
                                multiline
                                style={styles.largeInput}
                            />
                        </Item>

                        <Button 
                            full 
                            style={styles.button}
                            onPress={props.handleSubmit}>
                            <Text>Save Changes</Text>
                        </Button>
                        <Button title={'Go Back'} onPress={() => navigation.goBack()}/>                    
                    </View>
                )}
            </Formik>
        </Form>
    )
};

/* Because native-base doesn't have any margins for some reason */
const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        margin: 20,
    }, largeInput: {
        paddingTop: 18,
        paddingBottom: 18,
        // TODO remove once we're not using a keyboard
        maxHeight: 225
    }
});

export default EditEntry;
