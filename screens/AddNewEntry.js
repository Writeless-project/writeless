import React from 'react';
import AddEntry from '../containers/AddEntry';
import getTheme from '../native-base-theme/components';
import { StyleProvider } from 'native-base';

export default class AddNewEntry extends React.Component {

    constructor(props) {
        super(props);
        selectedJournal = this.props.navigation.state.params;
    }
    
    static navigationOptions = ({navigation}) => ({
        title: "New Entry",
      });


    render() {
        return (
            <StyleProvider style={getTheme()}>
                <AddEntry navigation={this.props.navigation} selectedJournal={selectedJournal}/>
            </StyleProvider>
        );
    }
}
