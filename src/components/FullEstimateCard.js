import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineSlices} from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Entypo';
import MakeStrip from '../components/MakeStrip';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomerStrip from '../components/CustomerStrip';
import WriteDescrition from '../screens/WriteDescrition';
import FillService from '../screens/FillService';

const FullEstimateCard = ({
  name,
  rate,
  quantity,
  removeServiceItem,
  index,
  description,
  discount,
}) => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View
      style={{
        borderColor: '#0000001F',
        borderWidth: 1,
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 10,
      }}>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => removeServiceItem(index)}
          style={{
            padding: 4,
            backgroundColor: '#EFF2FB',
            borderRadius: 50,
            marginHorizontal: 15,
            marginVertical: 5,
          }}>
          <Icon name="minus" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <Text style={{color: 'gray', marginLeft: -3}}>Service</Text>
        <Text style={{color: 'gray'}}>Qty</Text>
        <Text style={{color: 'gray'}}>Rate</Text>
        {/* <Text style={{color: 'gray'}}>Discount</Text> */}
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingHorizontal: 15,
        }}>
        <View style={{width: 80}}>
          <Text style={{color: 'black', fontSize: 16}}>{name}</Text>
        </View>

        <Text style={{color: 'black', fontSize: 16, marginLeft: -50}}>
          {quantity ? quantity : 1}
        </Text>
        <Text style={{color: 'black', fontSize: 16, marginLeft: -7}}>
          £{rate}
        </Text>
        {/* <Text style={{color: 'black', fontSize: 16}}>£{discount}</Text> */}
      </View>

      <View
        style={{
          borderBottomColor: '#0000001F',
          borderBottomWidth: 1,
          marginHorizontal: 30,
        }}></View>

      <TouchableOpacity
        onPress={() => navigation.navigate('WriteDescrition', {description})}
        style={{marginVertical: 10, marginHorizontal: 15, height: 20}}>
        <Text
          style={{
            // textDecorationLine: 'underline',
            color: '#3D75E1',
          }}>
          description
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FullEstimateCard;

const styles = StyleSheet.create({});
