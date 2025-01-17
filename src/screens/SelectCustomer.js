import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
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
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CustomerStrip from '../components/CustomerStrip';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import APISERVICES from '../apiService';
import CustomToast from '../components/Toast';

const SelectCustomer = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [searchText, setSearchText] = useState('');
  const route = useRoute();
  const focused = useIsFocused();
  const { selectServices, selectCustomerId, selectCustomer } = route.params;
  console.log(customer);
  // console.log(formik.values,"kk")

  const getCustomerList = () => {
    setLoading(true);
    APISERVICES.customer
      .get(`?customer=${searchText}`)
      .then(res => {
        if (!searchText) {
          setCustomer(res.data);
        } else {
          setCustomer(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', 'Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(searchText);

  useEffect(() => {
    getCustomerList();
  }, [searchText, focused]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      {loading && (
        <View style={{ position: 'absolute', top: '40%', left: '45%' }}>
          <ActivityIndicator size={50} color="black" />
        </View>
      )}
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
          style={{ marginLeft: 15 }}>
          <Icon2 name="chevron-left" size={27} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: '500',
          }}>
          Select Customer
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderWidth: 1.5,
          borderColor: '#EFF2F9',
          margin: 13,
          borderRadius: 10,
        }}>
        <View style={{ margin: 10 }}>
          <Icon1 name="search1" size={25} color="black" />
        </View>

        <TextInput placeholderTextColor="#A6AFC8"
          onChangeText={txt => {
            setSearchText(txt);
          }}
          style={{ marginLeft: 5, color: 'black', height: 52 }}

          placeholder=" Search Customer..."
        />
      </View>

      <ScrollView>
        {customer &&
          Array.isArray(customer) &&
          customer.map(item => (
            <CustomerStrip
              key={item.id} // Don't forget to add key prop
              firstName={item.first_name}
              lastName={item.last_name}
              services={item.services}
              selectCustomer={selectCustomer}
              selectServices={selectServices}
              selectCustomerId={selectCustomerId}
              id={item.id}
            />
          ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateCustomer')}
        style={{
          backgroundColor: '#3D75E1',
          display: 'flex',
          height: 50,
          width: 50,
          borderRadius: 10,
          position: 'absolute',
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
          top: '86%',
          left: '76%',
        }}>
        <Icon2 name="plus" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectCustomer;

const styles = StyleSheet.create({});
