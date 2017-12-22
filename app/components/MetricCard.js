import React from 'react';
import styled from 'styled-components/native';
import colorTheme from '../utils/colorTheme';
import {getMetricMetaInfo} from '../utils/helpers';

import {Text, View} from 'react-native';
import DateHeader from './DateHeader';

const Metric = styled(View)`
  flexDirection: row;
  marginTop: 12;
`;

const MetricCard = ({date, metrics}) => {
  return (
      <View>
        {date && <DateHeader date={date}/>}
        {Object.keys(metrics).map((metric) => {
          const {getIcon, displayName, unit} = getMetricMetaInfo(metric);

          return (
              <Metric key={metric}>
                {getIcon()}
                <View>
                  <Text style={{fontSize: 20}}>
                    {displayName}
                  </Text>
                  <Text style={{fontSize: 16, color: colorTheme.gray}}>
                    {metrics[metric]} {unit}
                  </Text>
                </View>
              </Metric>
          );
        })}
      </View>
  );
};

export default MetricCard;