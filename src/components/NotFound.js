import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NotFound = ({data}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          color: 'gray',
          marginBottom: '30%',
        }}>
        No {data} Available
      </Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({});
