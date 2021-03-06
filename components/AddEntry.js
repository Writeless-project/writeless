import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import { Text, Button, Item, Input, Form } from 'native-base';

const AddEntry = ({ addEntry, navigation}) => {
    selectedJournal = navigation.state.params;
    // Is this the 'react way' of doing this? I don't know any other way w/out making it a class.
    function onSubmit(formValues) {
        addEntry(formValues, selectedJournal);
        navigation.goBack();
    }
    
    return (
        /* Wrapping Formik in a Form for the styling. There's gotta be a better way to do this */
        <Form>
            <Formik onSubmit={onSubmit}>
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
                                placeholder="Tell me about it"
                                onChangeText={props.handleChange('content')}
                                multiline
                                value={props.values.content}
                                style={{paddingTop: 18, paddingBottom: 18}}
                            />
                        </Item>

                        <Button 
                        full 
                        style={styles.button}
                        onPress={props.handleSubmit}>
                            <Text>Save Entry</Text>
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
    }
});

export default AddEntry;