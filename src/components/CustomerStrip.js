import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

const CustomerStrip = ({
  id,
  firstName,
  lastName,
  selectServices,
  services,
  selectCustomerId,
  selectCustomer,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
        selectCustomer(firstName + ' ' + (lastName ? lastName : ''));
        selectServices(services);
        selectCustomerId(id);
      }}
      style={{borderBottomColor: '#E3E5EC', borderBottomWidth: 1, margin: 2}}>
      <Text style={{margin: 15, marginLeft: 25, fontSize: 16, color: 'black'}}>
        {firstName} {lastName}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomerStrip;

const styles = StyleSheet.create({});
