import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const ButtonBlue = ({handleOnPress, textComponent}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#344A97',
        height: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
      }}
      onPress={handleOnPress}>
      <Text
        className="font-semibold text-white"
        style={{fontWeight: '600', color: 'white', fontSize: 16}}>
        {textComponent}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonBlue;
