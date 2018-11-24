import React from 'react';
import {
    Button,
    View,
} from 'react-native';
import { Formik } from 'formik'

const DeleteJournals = ({ deleteJournals }) => {
    return (
        <Formik onSubmit={formValues => deleteJournals()}>
            {props => (
                <View>
                    <Button onPress={props.handleSubmit} title="Delete All Journals" />
                </View>
            )}
        </Formik>
    )
};


export default DeleteJournals;