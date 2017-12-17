import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import styled from 'styled-components/native';

export default class App extends React.Component {

  componentDidMount() {
    console.log('good');

    console.log('bad28');
  }

  render() {
    console.log([2, 4, 5, 6]);
    console.log([
      {
        id: 4,
        test: 'fsfsffsf',
      },
      {
        id: 5,
        test: 'fsfsffsf',
      },
      {
        id: 6,
        test: 'fsfsffsf',
      }]);
    console.log({faf: 'faefewaf', nume: 34,});

    return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Text>SaklS .</Text>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
