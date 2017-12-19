import React from 'react';
import {getMetricMetaInfo, timeToString} from '../utils/helpers';

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

class AddEntry extends React.Component {
  state = {
    run: 0,
    bike: 10,
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
    const key = timeToString();
    const entry = this.state;

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });
  };

  reset = () => {
    const key = timeToString();

  };

  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.prop.alreadyLogged) {
      return (
          <View>
            <Ionicons name={'ios-happy-outline'} size={100}/>
            <Text>You already logged your information for today.</Text>
          </View>
      );
    } else {
      return (
          <View>
            <Ionicons name={'ios-happy-outline'} size={100}/>
            <Text>You already logged your information for today.</Text>
            <ResetBtn onPress={this.reset}>
              Reset
            </ResetBtn>
          </View>
      )
    }

    return (
        <View>
          <DateHeader date={(new Date()).toLocaleDateString()}/>
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
          <SubmitBtn onPress={this.submit}/>
        </View>
    );
  };
}

export default AddEntry;