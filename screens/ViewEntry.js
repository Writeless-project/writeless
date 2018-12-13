import React from 'react';
import ViewEntry from '../containers/ViewEntry';
import getTheme from '../native-base-theme/components';
import { StyleProvider } from 'native-base';

export default class EditEntryScreen extends React.Component {
    selectedEntryId = null;

    constructor(props) {
        super(props);
        selectedEntry = this.props.navigation.state.params;
    }
    
    static navigationOptions = ({navigation}) => ({
        title: "View Entry",
    });

    render() {
        return (
            <StyleProvider style={getTheme()}>
                <ViewEntry navigation={this.props.navigation} />
            </StyleProvider>
        );
    }
}
