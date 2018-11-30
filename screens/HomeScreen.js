import React from 'react';
import { Provider } from 'react-redux';
import AllJournals from '../containers/AllJournals';
import { persistor, store } from '../configureStore';
import getTheme from '../native-base-theme/components';
import { StyleProvider, Container } from 'native-base';
import AddNewButton from '../components/AddNewButton';
import Loading from '../components/Loading';
import { PersistGate } from 'redux-persist/lib/integration/react';

// const store = configureStore();

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Journals'
  };

  _addNewJournal() {
    this.props.navigation.navigate('AddJournal');
}

  render() {
    // return (
    //   <StyleProvider style={getTheme()}>
    //     <Provider store={store}>
    //       <Container>
    //         <AllJournals navigation={this.props.navigation}/>
    //         <AddNewButton onBtnPress={this._addNewJournal.bind(this)}/>
    //       </Container>
    //     </Provider>
    //   </StyleProvider>
    // );
    persistor.purge();
    return (
      <StyleProvider style={getTheme()}>
        <Provider store={store}>
          <Container>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <AllJournals navigation={this.props.navigation} />
              <AddNewButton onBtnPress={this._addNewJournal.bind(this)} />
            </PersistGate>
          </Container>
        </Provider>
      </StyleProvider>
    );
  }
}
