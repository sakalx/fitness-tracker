import React from 'react';
import {connect} from 'react-redux';
import {addEntry, receiveEntries} from '../redux-core/actions/index';
import {getDailyReminderValue, timeToString} from '../utils/helpers';
import {fetchCalendarResults} from '../utils/api';

import {Text, View} from 'react-native';

@connect(store => ({store}))
class History extends React.Component {
  dispatch = this.props.dispatch;

  componentDidMount() {

    fetchCalendarResults().then(entries => {
      console.log(33);
      return this.dispatch(receiveEntries(entries));
    }).then(({entries}) => {
      if (!entries[timeToString()]) {
        this.dispatch(addEntry({
          [timeToString()]: getDailyReminderValue(),
        }));
      }
    });
  }

  render() {
    return (
        <View>
          <Text>{JSON.stringify(this.props)}</Text>
        </View>
    );
  }
}

export default History;