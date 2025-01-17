import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#344A97',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingLeft: 25,
          paddingRight: 25,
          paddingVertical: 15,
        }}>
        <Feather name="arrow-left" size={30} color="white" />
      </TouchableOpacity>

      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
            letterSpacing: 0.3,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
