import React from 'react';
import {Provider} from 'react-redux';
import store from './app/redux-core/store';

import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';
import AddEntry from './app/components/AddEntry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const Container = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  background-color: gold;
  justify-content: center;
`;

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
            <View>
              <AddEntry/>
            </View>
          </Provider>
      );
    }
  }
}

export default App;

// <Entypo name='app-store' color='grey' size={100}/>
