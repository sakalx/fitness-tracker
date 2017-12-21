import React from 'react';
import styled from 'styled-components/native';
import colorTheme from '../utils/colorTheme';

import {Slider, Text, View} from 'react-native';

const textCenter = `
  textAlign: center;
`;
const WrapRow = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
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
  color: ${colorTheme.gray}
`;

const FitnessSlider = ({max, value, unit, step, onChange}) =>
    <WrapRow>
      <Slider style={{flex: 1}}
              step={step}
              value={value}
              maximumValue={max}
              minimumValue={0}
              onValueChange={onChange}
      />
      <WrapMetricCounter>
        <MetricValue>{value}</MetricValue>
        <MetricUnit>{unit}</MetricUnit>
      </WrapMetricCounter>
    </WrapRow>;

export default FitnessSlider;