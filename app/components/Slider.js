import React from 'react';

import {View, Text, Slider} from 'react-native';

const FitnessSlider = ({max, value, unit, step, onChange}) =>
    <View>
      <Slider step={step}
              value={value}
              maximumValue={max}
              minimumValue={0}
              onValueChange={onChange}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>;

export default FitnessSlider;