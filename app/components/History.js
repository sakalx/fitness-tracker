import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import {AppLoading} from 'expo';
import colorTheme from '../utils/colorTheme';
import {addEntry, receiveEntries} from '../redux-core/actions/index';
import {getDailyReminderValue, timeToString} from '../utils/helpers';
import {fetchCalendarResults} from '../utils/api';

import {Platform, Text, TouchableOpacity, View} from 'react-native';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';

const Item = styled(View)`
  backgroundColor: ${colorTheme.white}
  borderRadius: ${Platform.OS === 'ios' ? 16 : 2};
  padding: 20px;
  margin: 17px 10px;
  justifyContent: center;
`;
const NoDataText = styled(Text)`
  fontSize: 20;
  padding: 20px;
`;

@connect(store => ({store}))
class History extends React.Component {
  dispatch = this.props.dispatch;

  state = {ready: false};

  componentDidMount() {
    fetchCalendarResults().
        then((entries) => this.dispatch(receiveEntries(entries))).
        then((entries) => {
          if (!entries[timeToString()]) {
            this.dispatch(addEntry({
              [timeToString()]: getDailyReminderValue(),
            }));
          }
        }).
        then(() => this.setState(() => ({ready: true})));
  }

  renderItem = ({today, ...metrics}, formattedDate, key) => (
      <Item>
        {today
            ? <View>
              <DateHeader date={formattedDate}/>
              <NoDataText>
                {today}
              </NoDataText>
            </View>
            : <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'EntryDetail',
                {entryId: key},
            )}>
              <MetricCard date={formattedDate}
                          metrics={metrics}
              />
            </TouchableOpacity>
        }
      </Item>
  );
  renderEmptyDate = (formattedDate) => {
    return (
        <Item>
          <DateHeader date={formattedDate}/>
          <NoDataText>
            You didn't log any data on this day.
          </NoDataText>
        </Item>
    );
  };

  render() {
    const {store} = this.props;
    const {ready} = this.state;

    if (!ready) {
      return <AppLoading />;
    }

    return (
        <UdaciFitnessCalendar items={store}
                              renderItem={this.renderItem}
                              renderEmptyDate={this.renderEmptyDate}
        />
    );
  }
}

export default History;