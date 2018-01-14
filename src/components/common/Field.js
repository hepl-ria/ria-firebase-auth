import React, {Component} from 'react';
import {View,Text,TextInput} from 'react-native';
import MainStyles from '../styles/MainStyles';

const Field = ({label,value,onChangeText,placeholder, secureTextEntry}) =>{

  const {inputStyle, labelStyle, containerStyle}= MainStyles;

  return(
    <View style={containerStyle}>

      <Text style={labelStyle}>{label}</Text>

      <TextInput
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle} />
      </View>
  )
}

export {Field};
