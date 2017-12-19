import React from 'react';

import {Text, TouchableOpacity} from 'react-native';

const ResetBtn = ({children, onPress}) =>
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>;

export default ResetBtn;