import React from 'react';
import AllJournals from '../containers/AllJournals';
import getTheme from '../native-base-theme/components';
import { StyleProvider, Container } from 'native-base';
import AddNewButton from '../components/AddNewButton';

export default class JournalsScreen extends React.Component {
  constructor(props) {
    super(props);
  } 
  
  // for the header text on the screen
  static navigationOptions = {
    title: 'Journals'
  };

  _addNewJournal() {
    this.props.navigation.navigate('AddJournal');
}

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <AllJournals navigation={this.props.navigation}/>
          <AddNewButton onBtnPress={this._addNewJournal.bind(this)}/>
        </Container>
      </StyleProvider>
    );
  }
}
