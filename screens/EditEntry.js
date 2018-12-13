import React from 'react';
import EditEntry from '../containers/EditEntry';
import getTheme from '../native-base-theme/components';
import { StyleProvider } from 'native-base';

export default class EditEntryScreen extends React.Component {
    selectedEntryId = null;

    constructor(props) {
        super(props);
        selectedEntry = this.props.navigation.state.params;
    }
    
    static navigationOptions = ({navigation}) => ({
        title: "Edit Entry",
    });

    render() {
        return (
            <StyleProvider style={getTheme()}>
                <EditEntry navigation={this.props.navigation} />
            </StyleProvider>
        );
    }
}
