import React from 'react';
import styled, {css} from 'styled-components/native';
import colorTheme from '../utils/colorTheme';
import {Location, Permissions} from 'expo';
import {calculateDirection} from '../utils/helpers';

import {Foundation} from '@expo/vector-icons';
import {ActivityIndicator, Animated, Text, TouchableOpacity, View} from 'react-native';

const Wrap = styled(View)`
  flex: 1;
  justifyContent: space-between;
`;
const CenterWrap = styled(View)`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  margin: 0 30px;
`;
const Btn = styled(TouchableOpacity)`
  padding: 10px;
  backgroundColor: ${colorTheme.purple}
  alignSelf: center;
  borderRadius: 5;
  margin: 20px;
`;
const ButtonText = styled(Text)`
  color: ${colorTheme.white};
  fontSize: 20;
`;
const DirectionContainer = styled(View)`
  flex: 1;
  justifyContent: center;
`;
const Header = styled(Text)`
 ${props => props.primary && css`
    color: ${colorTheme.white};
  `}
  fontSize: 35;
  textAlign: center;
`;
const Direction = styled(Text)`
  color: ${colorTheme.purple};
  fontSize: 120;
  textAlign: center;
  ${props => props.scale && css`
    transform: scale(${props.scale});
  `}
`;
const MetricContainer = styled(View)`
  flexDirection: row;
  justifyContent: space-around;
  backgroundColor: ${colorTheme.purple};
`;
const Metric = styled(View)`
  flex: 1;
  padding: 15px 0;
  backgroundColor: rgba(255, 255, 255, 0.1);
  margin: 20px 10px;
`;
const SubHeader = styled(Text)`
  fontSize: 25;
  textAlign: center;
  marginTop: 5px;
`;

class Live extends React.Component {
  state = {
    coords: {},
    status: null,
    direction: '',
    bounceValue: new Animated.Value(1),
  };

  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION).then(({status}) => {
      if (status === 'granted') {
        return this.setLocation();
      }

      this.setState(() => ({status}));
    }).catch((error) => {
      console.warn('Error getting Location permission: ', error);

      this.setState(() => ({status: 'undetermined'}));
    });
  }

  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
    .then((status) => {
      if (status === 'granted') {
        return this.setLocation()
      }
      this.setState(() => ({ status }))
    })
    .catch((error) => console.warn('error asking Location permission: ', error))
  };

  setLocation = () => {
    Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: 1,
      distanceInterval: 1,
    }, ({coords}) => {
      const newDirection = calculateDirection(coords.heading);
      const {direction, bounceValue} = this.state;

      if (newDirection === direction) {
        Animated.sequence([
            Animated.timing(bounceValue, {duration: 200, toValue: 1.04}),
            Animated.spring(bounceValue, {toValue:1, friction: 4})
        ]).start()
      }

      this.setState(() => ({
        coords,
        status: 'granted',
        direction: newDirection,
      }));
    });
  };

  render() {
    const {status, coords, direction, bounceValue } = this.state;

    if (status === null) {
      return <ActivityIndicator style={{marginTop: 30}}/>;
    }
    if (status === 'denied') {
      return (
          <CenterWrap>
            <Foundation name='alert' size={50} />
            <SubHeader>
              You denied your location.
              You can fix this by visiting your settings
              and enabling location services for this app.
            </SubHeader>
          </CenterWrap>
      );
    }
    if (status === 'undetermined') {
      return (
          <CenterWrap>
            <Foundation name='alert' size={50}/>
            <SubHeader>
              You need to enable location services for this app.
            </SubHeader>
            <Btn onPress={this.askPermission}>
              <ButtonText>
                Enable
              </ButtonText>
            </Btn>
          </CenterWrap>
      );
    }
    return (
        <Wrap>
          <DirectionContainer>
            <Header>You're heading</Header>
            <Direction scale="0.2">
              {direction}
              </Direction>
          </DirectionContainer>
          <MetricContainer>
            <Metric>
              <Header primary>
                Altitude
              </Header>
              <SubHeader>
                {Math.round(coords.altitude * 3.2808)} Feet
              </SubHeader>
              <Header primary>
                Speed
              </Header>
              <SubHeader>
                {(coords.speed * 2.2369).toFixed(1)} MPH
              </SubHeader>
            </Metric>
          </MetricContainer>
        </Wrap>
    );
  }
}

export default Live;