import React from 'react';
import ViewEntry from '../containers/ViewEntry';
import getTheme from '../native-base-theme/components';
import { StyleProvider } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Entypo  } from '@expo/vector-icons';

export default class EditEntryScreen extends React.Component {
    selectedEntryId = null;

    constructor(props) {
        super(props);
        selectedEntry = this.props.navigation.state.params;
    }
    
    static navigationOptions = ({navigation}) => ({
        title: "View Entry",
        headerLeft: (
            <View>
                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Entypo name={'chevron-small-left' || "chevron-left"} size={42 || 80} color="blue" />
                </TouchableOpacity>
            </View>
        ),
    });

    render() {
        return (
            <StyleProvider style={getTheme()}>
                <ViewEntry navigation={this.props.navigation} />
            </StyleProvider>
        );
    }
}