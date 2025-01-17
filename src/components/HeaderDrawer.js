import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineSlices} from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import {TextInput} from 'react-native-gesture-handler';
import EstimatesStrip from '../components/EstimatesStrip';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import APISERVICES from '../apiService';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import CustomToast from '../components/Toast';

const HeaderDrawer = ({title}) => {
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
        onPress={() => navigation.openDrawer()}
        style={{
          paddingHorizontal: 25,
          paddingVertical: 15,
        }}>
        <Icon name="bars" size={27} color="white" />
      </TouchableOpacity>

      <View style={{width: '65%', alignItems: 'center'}}>
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

export default HeaderDrawer;

const styles = StyleSheet.create({});
