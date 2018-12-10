import React from 'react';
import AddEntry from '../containers/AddEntry';
import getTheme from '../native-base-theme/components';
import { StyleProvider } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Entypo  } from '@expo/vector-icons';

export default class AddNewEntry extends React.Component {

    constructor(props) {
        super(props);
        selectedJournal = this.props.navigation.state.params;
    }
    
    static navigationOptions = ({navigation}) => ({
        title: "New Entry",
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
                <AddEntry navigation={this.props.navigation} selectedJournal={selectedJournal}/>
            </StyleProvider>
        );
    }
}
