import React from 'react';
import styled from 'styled-components/native';
import colorTheme from '../utils/colorTheme';

import {Text, TouchableOpacity} from 'react-native';

const TextForBtn = styled(Text)`
 text-align: center;
 color: ${colorTheme.purple};
`;

const TextBtn = ({children, onPress, style={}}) =>
    <TouchableOpacity onPress={onPress}>
      <TextForBtn style={style}>{children}</TextForBtn>
    </TouchableOpacity>;

export default TextBtn;