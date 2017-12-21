import React from 'react';
import {Provider} from 'react-redux';
import store from './app/redux-core/store';

import {ScrollView, Text} from 'react-native';
import History from './app/components/History';

class App extends React.Component {
  state = {fontsAreLoaded: false};

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({fontsAreLoaded: true});
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <Text>Spiner . . . . almost done</Text>;
    } else {
      return (
          <Provider store={store}>
            <ScrollView contentContainerStyle={{flex: 1}}>
              <History/>
            </ScrollView>
          </Provider>
      );
    }
  }
}

export default App;

// <Entypo name='app-store' color='grey' size={100}/>
