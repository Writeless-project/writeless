import React from 'react';
import AllEntries from '../containers/AllEntries';
import getTheme from '../native-base-theme/components';
import { StyleProvider, Container } from 'native-base';
import AddNewButton from '../components/AddNewButton';

export default class EntriesScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  // for the header text on the screen
  static navigationOptions = {
    title: 'Entries'
  };

  _addNewEntry() {
    // you can pass this to navigate, it being the journal, or you can pass it as a prop in the AddNewButon and access it in that component
    this.props.navigation.navigate('AddEntry', this.props.navigation.state.params);
}

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <AllEntries navigation={this.props.navigation}/>
          <AddNewButton onBtnPress={this._addNewEntry.bind(this)}/>
        </Container>
      </StyleProvider>
    );
  }
}
