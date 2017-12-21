import React from 'react';
import styled from 'styled-components/native';
import colorTheme from '../utils/colorTheme';

import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Entypo, FontAwesome} from '@expo/vector-icons';

const textCenter = `
  textAlign: center;
`;
const row = `
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const WrapRowSpBetween = styled(View)`
  ${row}
  justify-content: space-between;
`;
const WrapRow = styled(View)`
  ${row}
`;
const IosBtn = `
  backgroundColor: ${colorTheme.white};
  borderColor: ${colorTheme.purple};
  borderWidth: 1;
  borderRadius: 3;
  padding: 5px 25px;
`;
const AndroidBtn = `
  margin: 5px;
  backgroundColor: ${colorTheme.purple};
  padding: 10px;
  borderRadius: 2;
`;
const button = Platform.OS === 'ios' ? IosBtn : AndroidBtn;
const ActionButton = styled(TouchableOpacity)`
  ${button}
`;
const WrapMetricCounter = styled(View)`
  width: 85;
  justifyContent: center;
  alignItems: center;
`;
const MetricValue = styled(Text)`
  ${textCenter}
  fontSize: 24;
`;
const MetricUnit = styled(Text)`
  ${textCenter}
  fontSize: 18;
  color: ${colorTheme.lightPurp}
`;

const Stepper = ({max, value, unit, step, onIncrement, onDecrement}) => {
  let IconPlus;
  let IconMinus;

  if (Platform.OS === 'ios') {
    IconPlus = <Entypo name="plus" size={30} color={colorTheme.purple}/>;
    IconMinus = <Entypo name="minus" size={30} color={colorTheme.purple}/>;
  } else {
    IconPlus = <FontAwesome name="plus" size={30} color={colorTheme.white}/>;
    IconMinus = <FontAwesome name="minus" size={30} color={colorTheme.white}/>;
  }

  return (
      <WrapRowSpBetween>
        <WrapRow>
          <ActionButton onPress={onDecrement}>
            {IconMinus}
          </ActionButton>
          <ActionButton onPress={onIncrement}>
            {IconPlus}
          </ActionButton>
        </WrapRow>
        <WrapMetricCounter>
          <MetricValue>{value}</MetricValue>
          <MetricUnit>{unit}</MetricUnit>
        </WrapMetricCounter>
      </WrapRowSpBetween>
  );
};

export default Stepper;