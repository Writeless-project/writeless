import React from 'react';
import {
    Button,
    View,
} from 'react-native';
import { Formik } from 'formik'

// Where does deleteJournal() come from?
const DeleteJournal = ({ deleteJournal }) => {
    return (
        <Formik onSubmit={formValues => deleteJournal()}>
            {props => (
                <View>
                    <Button onPress={props.handleSubmit} title="Delete"/>
                </View>
            )}
        </Formik>
    )
};

export default DeleteJournal;