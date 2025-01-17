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
import NotFound from '../components/NotFound';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [pendingActive, setPendingActive] = useState(true);
  const [completedActive, setCompletedActive] = useState(false);
  const [status, setStatus] = useState('Pending');
  const [customer, setCustomer] = useState('');
  const [estimateList, setEstimateList] = useState([]);
  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;
  const focused = useIsFocused();

  ///////////////////////////////////////////////// PULL TO REFRESH ///////////////////////////////////////////////////////////////

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCustomer('');
    setTimeout(() => {
      getEstimateList();
      setRefreshing(false);
    }, 1000);
  }, [status, customer]);

  const getEstimateList = () => {
    setLoading(true);
    APISERVICES.estimate
      .get(`?tab_status=${status}&customer=${customer}`)
      .then(res => {
        setEstimateList(res.data);
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', 'Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getEstimateList();
  }, [status, customer, focused]);

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
            Estimates
          </Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomColor: '#E3EDFF',
          borderBottomWidth: 2,
        }}>
        <TouchableOpacity
          onPress={() => {
            setStatus('Pending');
            setPendingActive(true);
            setCompletedActive(false);
          }}
          style={[styles.container, pendingActive && styles.withBorder]}>
          <Text style={[styles.text, pendingActive && styles.activeText]}>
            Pending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setStatus('Approved');
            setCompletedActive(true);
            setPendingActive(false);
          }}
          style={[styles.container, completedActive && styles.withBorder]}>
          <Text style={[styles.text, completedActive && styles.activeText]}>
            Approved
          </Text>
        </TouchableOpacity>
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
          value={customer}
          onChangeText={text => {
            setCustomer(text);
          }}
          style={{
            marginLeft: 5,
            color: 'black',
            width: '75%', height: 52
          }}

          placeholder=" Search estimates..."
        />

        <TouchableOpacity
          onPress={() => setCustomer('')}
          style={{
            width: '15%',
            justifyContent: 'center',
            paddingLeft: 5,
          }}>
          <Icon5 name="cross" size={20} color="#A6AFC8" />
        </TouchableOpacity>
      </View>

      {estimateList.length === 0 ? (
        <NotFound data="Estimate" />
      ) : (
        <View
          style={{
            height: '75%',
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            {estimateList.map(item => (
              <EstimatesStrip
                key={item.id}
                already_convert={item?.already_convert}
                id={item.id}
                name={
                  item?.customer?.first_name +
                  ' ' +
                  (item?.customer?.last_name ? item?.customer?.last_name : '')
                }
                email={item?.customer?.email}
                phone={item?.customer?.phone}
                role={item?.created_by?.roles[0].label}
                draft={item?.draft}
                status={item?.status}
                onSuccess={getEstimateList}
                getEstimateList={getEstimateList}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {permissions?.estimate?.Add && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateEstimate')}
          style={{
            backgroundColor: '#3D75E1',
            display: 'flex',
            height: 50,
            width: 50,
            borderRadius: 10,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: '86%',
            left: '76%',
          }}>
          <Icon5 name="plus" size={32} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    alignItems: 'center',
  },
  withBorder: {
    borderBottomWidth: 3,
    borderBottomColor: '#344A97',
  },
  text: {
    marginVertical: 12,
    fontSize: 17,
    color: 'gray',
  },
  activeText: {
    color: '#344A97',
  },
});
