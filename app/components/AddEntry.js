import React from 'react';
import {connect} from 'react-redux';
import {addEntry} from '../redux-core/actions/index';
import {getDailyReminderValue, getMetricMetaInfo, timeToString} from '../utils/helpers';
import {removeEntry, submitEntry} from '../utils/api';

import {Text, TouchableOpacity, View} from 'react-native';
import DateHeader from './DateHeader';
import Slider from './Slider';
import Stepper from './Steppers';
import ResetBtn from './ResetBt';
import {Ionicons} from '@expo/vector-icons';

const SubmitBtn = ({onPress}) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Text>Submit</Text>
      </TouchableOpacity>
  );
};

@connect(store => ({store}))

class AddEntry extends React.Component {
  dispatch = this.props.dispatch;
  key = timeToString();

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const {max, step} = getMetricMetaInfo(metric);

    this.setState((state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count,
      };
    });
  };

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }));
  };

  submit = () => {
    const entry = this.state;

    this.dispatch(addEntry({[this.key]: entry}));
    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });
    submitEntry({key: this.key, entry});
  };

  reset = () => {
    this.dispatch(addEntry({[this.key]: getDailyReminderValue()}));
    removeEntry(this.key);
  };

  render() {
    console.log(this.props.store);

    const {store} = this.props;
    const metaInfo = getMetricMetaInfo();
    const alreadyLogged = store[this.key] && typeof store[this.key].today === 'undefined';

    if (alreadyLogged) {
      return (
          <View>
            <Ionicons name={'ios-happy-outline'} size={100}/>
            <Text>You already logged your information for today.</Text>
            <ResetBtn onPress={this.reset}>Reset.</ResetBtn>
          </View>
      );
    }

    return (
        <View>
          <DateHeader date={(new Date()).toLocaleDateString()}/>
          <SubmitBtn onPress={this.submit}/>

          {Object.keys(metaInfo).map(key => {
            const {getIcon, type, ...rest} = metaInfo[key];
            const value = this.state[key];

            return (
                <View key={key}>
                  {getIcon()}
                  {type === 'slider'
                      ? <Slider value={value}
                                onChange={(value) => this.slide(key, value)}
                                {...rest}
                      />
                      : <Stepper value={value}
                                 onIncrement={(value) => this.increment(key)}
                                 onDecrement={(value) => this.decrement(key)}
                                 {...rest}
                      />
                  }
                </View>
            );
          })}

        </View>
    );
  };
}

export default AddEntry;