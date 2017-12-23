import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import colorTheme from '../utils/colorTheme';
import {addEntry} from '../redux-core/actions/index';
import {removeEntry} from '../utils/api';
import {getDailyReminderValue, timeToString} from '../utils/helpers';

import {View} from 'react-native';
import MetricCard from './MetricCard';
import TextButton from './TextBtn';

const Wrap = styled(View)`
 flex: 1;
 backgroundColor: ${colorTheme.white};
 padding: 15px;
`;

@connect(store => ({store}))
class EntryDetail extends React.Component {
  dispatch = this.props.dispatch;
  entryId = this.props.navigation.state.params.entryId;
  metrics = this.props.store[this.entryId];

  shouldComponentUpdate(nextProps) {
    return nextProps.store[this.entryId] !== null && !nextProps.store[this.entryId].today;
  }


  static navigationOptions = ({navigation}) => {
    const {entryId} = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`,
    };
  };

  remove = () => {
    this.dispatch(addEntry({
      [this.entryId]: timeToString() === this.entryId
          ? getDailyReminderValue() : null,

    }));
  };

  reset = () => {
    this.remove();
    this.props.navigation.goBack();
    removeEntry(this.entryId);
  };

  render() {
    return (
        <Wrap>
          <MetricCard metrics={this.metrics}/>
          <TextButton style={{margin: 20}} onPress={this.reset}>
            RESET
          </TextButton>
        </Wrap>
    );
  }
}

export default EntryDetail;