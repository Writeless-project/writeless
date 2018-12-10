import React from 'react';
import {
    View,
    StyleSheet,
    Keyboard
} from 'react-native';
import { Formik } from 'formik';
import { Text, Button, Item, Input, Form } from 'native-base';

const AddJournal = ({ addJournal, navigation }) => {
    function onSubmit(formValues) {
        addJournal(formValues);
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
                                placeholder="Enter journal title here..."
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                            />
                        </Item>
                        <Button 
                        full 
                        style={styles.button}
                        onPress={props.handleSubmit}>
                            <Text>Submit</Text>
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

export default AddJournal;