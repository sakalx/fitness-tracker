import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import colorTheme from '../utils/colorTheme';
import {addEntry} from '../redux-core/actions/index';
import {
  clearLocalNotification,
  getDailyReminderValue,
  getMetricMetaInfo,
  setLocalNotification,
  timeToString
} from '../utils/helpers';
import {removeEntry, submitEntry} from '../utils/api';
import {NavigationActions} from 'react-navigation';

import {Platform, Text, TouchableOpacity, View} from 'react-native';
import DateHeader from './DateHeader';
import Slider from './Slider';
import Stepper from './Steppers';
import TextBtn from './TextBtn';
import {Ionicons} from '@expo/vector-icons';

const Wrap = styled(View)`
  flex: 1;
  background-color: ${colorTheme.white};
  padding: 20px;
`;
const WrapRow = styled(View)`
  flex: 1;
  flexDirection: row;    
  alignItems: center;
`;
const WrapCenter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const IosSubmitBtn = styled(TouchableOpacity)`
  background-color: ${colorTheme.purple};
  padding: 10px;
  borderRadius: 7px;
  height: 45px;
  margin: 0 40px;
`;
const AndroidSubmitBtn = styled(TouchableOpacity)`
  background-color: ${colorTheme.purple};
  padding: 10px 30px;
  height: 45px;
  border-radius: 2px;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
`;
const SubmitBtnText = styled(Text)`
  color: ${colorTheme.white};
  fontSize: 22;
  text-align: center;
`;

const SubmitBtn = ({onPress}) => {
  const SubmitBtn = Platform.OS === 'ios' ? IosSubmitBtn : AndroidSubmitBtn;
  return (
      <SubmitBtn onPress={onPress}>
        <SubmitBtnText>Submit</SubmitBtnText>
      </SubmitBtn>
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
    this.toHome();
    submitEntry({key: this.key, entry});

    clearLocalNotification()
        .then(setLocalNotification)
  };

  reset = () => {
    this.dispatch(addEntry({[this.key]: getDailyReminderValue()}));
    this.toHome();
    removeEntry(this.key);
  };
  toHome = () =>
  this.props.navigation.dispatch(NavigationActions.back({key: 'AddEntry'}));

  render() {
    const {store} = this.props;
    const metaInfo = getMetricMetaInfo();
    const alreadyLogged = store[this.key] && typeof store[this.key].today === 'undefined';

    if (alreadyLogged) {
      return (
          <WrapCenter>
            <Ionicons name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                      size={100}/>
            <Text style={{textAlign: 'center'}}>
              You already logged your information for today.
            </Text>
            <TextBtn onPress={this.reset}>Reset.</TextBtn>
          </WrapCenter>
      );
    }

    return (
        <Wrap>
          <DateHeader date={(new Date()).toLocaleDateString()}/>
          {Object.keys(metaInfo).map(key => {
            const {getIcon, type, ...rest} = metaInfo[key];
            const value = this.state[key];

            return (
                <WrapRow key={key}>
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
                </WrapRow>
            );
          })}
          <SubmitBtn onPress={this.submit}/>
        </Wrap>
    );
  };
}

export default AddEntry;