import React from 'react';
import styled from 'styled-components/native';
import colorTheme from '../utils/colorTheme';

import {Text} from 'react-native';

const HeaderText = styled(Text)`
  color: ${colorTheme.purple};
  fontSize: 25;
`;

const DateHeader = ({date}) =>
    <HeaderText>{date}</HeaderText>;

export default DateHeader;