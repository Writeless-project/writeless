import React from 'react';
import { Provider } from 'react-redux';
import AddJournal from '../containers/AddJournal';
import { createStore } from 'redux';
import getTheme from '../native-base-theme/components';
import { StyleProvider } from 'native-base';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import Loading from '../components/Loading';
import rootReducer from '../reducers';

import BackButton from '../components/BackButton';

// const store = configureStore();

const persistConfig = {
    key: 'root',
    storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);

export default class AddNewJournal extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "New Journal",
        headerLeft: (
            <BackButton name={'chevron-small-left'} 
            size={42} 
            nav={navigation}
            location={'Main'}/>
        ),
      });


    render() {
        // return (
        //     <StyleProvider style={getTheme()}>
        //         <Provider store={store}>
        //             <AddJournal navigation={this.props.navigation}/>
        //         </Provider>
        //     </StyleProvider>
        // );

        return (
            <StyleProvider style={getTheme()}>
                <Provider store={store}>
                    <PersistGate loading={<Loading />} persistor={persistor}>
                        <AddJournal navigation={this.props.navigation} />
                    </PersistGate>
                </Provider>
            </StyleProvider>
        );
    }
}
