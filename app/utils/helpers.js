import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import colorTheme from './colorTheme';

import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

const IconLayout = styled(View)`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 20px;
  padding: 5px;
`;

export function getMetricMetaInfo(metric) {
  const info = {
    run: {
      displayName: 'Run',
      max: 50,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon() {
        return (
            <IconLayout style={{backgroundColor: colorTheme.red}}>
              <MaterialIcons
                  name='directions-run'
                  color={colorTheme.white}
                  size={35}
              />
            </IconLayout>
        );
      },
    },
    bike: {
      displayName: 'Bike',
      max: 100,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon() {
        return (
            <IconLayout style={{backgroundColor: colorTheme.orange}}>
              <MaterialCommunityIcons
                  name='bike'
                  color={colorTheme.white}
                  size={32}
              />
            </IconLayout>
        );
      },
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      unit: 'meters',
      step: 100,
      type: 'steppers',
      getIcon() {
        return (
            <IconLayout style={{backgroundColor: colorTheme.blue}}>
              <MaterialCommunityIcons
                  name='swim'
                  color={colorTheme.white}
                  size={35}
              />
            </IconLayout>
        );
      },
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'hours',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
            <IconLayout style={{backgroundColor: colorTheme.lightPurp}}>
              <FontAwesome
                  name='bed'
                  color={colorTheme.white}
                  size={30}
              />
            </IconLayout>
        );
      },
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
            <IconLayout style={{backgroundColor: colorTheme.pink}}>
              <MaterialCommunityIcons
                  name='food'
                  color={colorTheme.white}
                  size={35}
              />
            </IconLayout>
        );
      },
    },
  };

  return typeof metric === 'undefined'
      ? info
      : info[metric];
}

export function isBetween(num, x, y) {
  return num >= x && num <= y;
}

export function calculateDirection(heading) {
  let direction = '';

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North';
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East';
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East';
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East';
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South';
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West';
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West';
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West';
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North';
  } else {
    direction = 'Calculating';
  }

  return direction;
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return todayUTC.toISOString().split('T')[0];
}

export function getDailyReminderValue() {
  return {
    today: '👋 Don\'t forget to log your data today!',
  };
}