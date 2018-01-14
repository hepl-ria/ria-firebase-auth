import React from 'react';
import {View, Text} from 'react-native';
import MainStyles from '../styles/MainStyles';

const Header = (props) => {
  const {headerStyle, headerTextStyle} = MainStyles;
  return(
    <View style={headerStyle}>
      <Text style={headerTextStyle}>{props.headerText}</Text>
    </View>
  )
};
export {Header};
