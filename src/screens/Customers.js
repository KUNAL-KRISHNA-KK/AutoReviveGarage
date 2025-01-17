import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import { TextInput } from 'react-native-gesture-handler';
import EstimatesStrip from '../components/EstimatesStrip';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import APISERVICES from '../apiService';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import CustomToast from '../components/Toast';
import CustomerCard from '../components/CustomerCard';
import Icon2 from 'react-native-vector-icons/Entypo';
import NotFound from '../components/NotFound';

const Customers = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [searchText, setSearchText] = useState('');
  const focused = useIsFocused();

  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchText('');
    setTimeout(() => {
      getCustomerList();
      setRefreshing(false);
    }, 1000);
  }, []);

  const getCustomerList = () => {
    setLoading(true);
    APISERVICES.customer
      .get(`?customer=${searchText}`)
      .then(res => {
        if (!searchText) {
          setCustomers(res.data);
        } else {
          setCustomers(res.data);
          // console.log(res.data)
        }
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCustomerList();
  }, [searchText, focused]);

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }}>
      {loading && (
        <View
          style={{ margin: 15, position: 'absolute', top: '50%', left: '48%' }}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}
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

        <View style={{ width: '65%', alignItems: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '500',
              letterSpacing: 0.3,
            }}>
            Customers
          </Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderWidth: 1.5,
          borderColor: '#D8E0E8',
          margin: 17,
          borderRadius: 10,
        }}>
        <View style={{ margin: 10 }}>
          <Icon1 name="search1" size={25} color="black" />
        </View>
        <TextInput placeholderTextColor="#A6AFC8"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          style={{ marginLeft: 5, color: 'black', width: '75%', height: 52 }}

          placeholder=" Search Customers..."
        />
        <TouchableOpacity
          onPress={() => setSearchText('')}
          style={{
            width: '15%',
            justifyContent: 'center',
            paddingLeft: 5,
            // backgroundColor: 'teal',
          }}>
          <Icon5 name="cross" size={20} color="#A6AFC8" />
        </TouchableOpacity>
      </View>

      {customers.length == 0 ? (
        <NotFound data="Customers" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ marginHorizontal: 2 }}
          showsVerticalScrollIndicator={false}>
          {customers?.map(item => (
            <CustomerCard
              id={item.id}
              firstName={item.first_name}
              lastName={item.last_name}
              email={item.email}
              phone={item.phone}
              role={item.company_type_name}
              onSuccess={getCustomerList}
            />
          ))}
        </ScrollView>
      )}

      {permissions?.customer?.Add && (
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
      )}
    </SafeAreaView>
  );
};

export default Customers;

const styles = StyleSheet.create({});
