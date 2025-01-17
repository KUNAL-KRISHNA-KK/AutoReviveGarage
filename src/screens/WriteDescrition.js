import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Entypo';
import MakeStrip from '../components/MakeStrip';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomerStrip from '../components/CustomerStrip';

const WriteDescrition = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { description } = route.params;
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          height: 60,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#D0DBE8',
          borderBottomWidth: 2,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 15 }}>
          <Icon2 name="chevron-left" size={23} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: '500',
          }}>
          Description
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderWidth: 1.5,
          borderColor: '#D8E0E8',
          marginHorizontal: 20,
          borderRadius: 10,
          justifyContent: 'space-between',
          marginBottom: 10,
          marginTop: 30,
        }}>
        <TextInput placeholderTextColor="#A6AFC8"
          editable={false}
          value={description}
          style={{ paddingHorizontal: 30, fontSize: 16, color: 'black', height: 100 }}
          placeholder="Write Description"

          multiline={true}
        />
      </View>

      {/* <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: '#3D75E1',
            marginHorizontal: 30,
            marginTop: 50,
            height: 45,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 16}}>OK</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default WriteDescrition;

const styles = StyleSheet.create({});
