import React from 'react';
import {Provider} from 'react-redux';
import {Constants} from 'expo';
import {TabNavigator} from 'react-navigation';
import store from './app/redux-core/store';
import colorTheme from './app/utils/colorTheme';

import {Platform, ScrollView, StatusBar, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import History from './app/components/History';
import AddEntry from './app/components/AddEntry';

const FitnessStatusBar = ({backgroundColor, ...props}) => {
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  );
};

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks'
                                             size={30}
                                             color={tintColor}/>,
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({tintColor}) => <Ionicons name='plus-squar'
                                             size={30}
                                             color={tintColor}/>,
    },
  },
}, {
  tabBarOptions: {
    navigationOptions: {
      header: null,
    },
    activeTintColor: Platform.OS === 'ios' ? colorTheme.purple : colorTheme.white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? colorTheme.white : colorTheme.purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
});

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
              <FitnessStatusBar backgroundColor={colorTheme.purple}
                                barStyle="light-content"
              />
              <Tabs/>
            </ScrollView>
          </Provider>
      );
    }
  }
}

export default App;
