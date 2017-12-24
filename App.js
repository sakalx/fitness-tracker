import React from 'react';
import {Provider} from 'react-redux';
import {Constants} from 'expo';
import {StackNavigator, TabNavigator} from 'react-navigation';
import store from './app/redux-core/store';
import {setLocalNotification} from './app/utils/helpers';
import colorTheme from './app/utils/colorTheme';

import {Platform, ScrollView, StatusBar, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import History from './app/components/History';
import AddEntry from './app/components/AddEntry';
import EntryDetail from './app/components/EntryDetail';
import Live from './app/components/Live';

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
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-speedometer'
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: colorTheme.white,
      headerStyle: {
        backgroundColor: colorTheme.purple,
      },
    },
  },
});

class App extends React.Component {
  state = {fontsAreLoaded: false};

  componentDidMount() {
    setLocalNotification()
  }

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
              <MainNavigator/>
            </ScrollView>
          </Provider>
      );
    }
  }
}

export default App;
