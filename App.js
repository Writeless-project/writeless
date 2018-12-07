import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import AddNewJournal from './screens/AddNewJournal';
import AddNewEntry from './screens/AddNewEntry';
import EditJournalScreen from './screens/EditJournal';

const store = configureStore();

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    AddJournal: AddNewJournal,
    EditJournal: EditJournalScreen,
    AddEntry: AddNewEntry
  }, {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
