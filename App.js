import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import JournalsScreen from './screens/JournalsScreen';
import AddNewJournal from './screens/AddNewJournal';
import AddNewEntry from './screens/AddNewEntry';
import EditJournalScreen from './screens/EditJournal';
import EntriesScreen from './screens/EntriesScreen';

/* For clearing entries - Leave for development */

// import { AsyncStorage } from 'react-native'
// (async () => {
//   let allKeys = await AsyncStorage.getAllKeys()
//   for (let i = 0; i < allKeys.length; i++) {
//     console.log(allKeys[i])
//     // if (allKeys[i] !== 'Journals') {
//       console.log(allKeys[i])
//       await AsyncStorage.removeItem(allKeys[i]);
//     //  }
//   }
//   await AsyncStorage.removeItem('Entries');
// })()

const store = configureStore();

const AppNavigator = createStackNavigator(
  {
    Home: JournalsScreen,
    AddJournal: AddNewJournal,
    EditJournal: EditJournalScreen,
    Entries: EntriesScreen,
    AddEntry: AddNewEntry,
    // EditEntry: EditEntry
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
