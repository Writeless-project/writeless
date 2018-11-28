import React from 'react';
import { Provider } from 'react-redux';
import AddJournal from '../containers/AddJournal';
import configureStore from '../configureStore';
import getTheme from '../native-base-theme/components';
import { StyleProvider } from 'native-base';

import BackButton from '../components/BackButton';

const store = configureStore();

export default class AddNewJournal extends React.Component {

    static navigationOptions = {
        title: "Hi There",
        headerLeft: (
            <BackButton name={'chevron-small-left'} size={42} navigation={this.props.navigation}/>
        ),
      };

    render() {
        return (
            <StyleProvider style={getTheme()}>
                <Provider store={store}>
                    <AddJournal navigation={this.props.navigation}/>
                </Provider>
            </StyleProvider>
        );
    }
}
