import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import APISERVICES from '../apiService';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loading from '../components/Loading';
import ButtonBlue from '../components/ButtonBlue';
import {useSelector} from 'react-redux';

const CustomerDetail = () => {
  const [customerDetail, setCustomerDetail] = useState();
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const route = useRoute();
  const id = route?.params;

  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;
  // console.log(permissions?.customer?.Add);

  const getCustomerDetail = () => {
    setloading(true);
    APISERVICES.customer
      .get(id)
      .then(res => {
        // console.log(res.data)
        setCustomerDetail(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setloading(false));
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  const navigateToUpdate = () => {
    setloading(true);
    navigation.navigate('UpdateCustomer', customerDetail);
    setloading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Customer Detail" />

      {loading && <Loading />}

      <View
        style={{
          width: '92%',
          marginLeft: 16,
          borderRadius: 5,
          borderColor: '#DCE2EC',
          borderWidth: 3,
          marginTop: 8,
        }}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{width: '50%', padding: 15}}>
            <Text style={{color: '#717171', letterSpacing: 0.3}}>
              Customer Name:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
              }}>
              {customerDetail?.first_name} {customerDetail?.last_name}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
              padding: 15,
              paddingLeft: 30,
              letterSpacing: 0.3,
            }}>
            <Text style={{color: '#717171'}}>Phone No</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
              }}>
              {customerDetail?.phone}
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              color: '#717171',
              marginLeft: 20,
              marginTop: 5,
              letterSpacing: 0.3,
            }}>
            E-Mail:
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginLeft: 20,
              letterSpacing: 0.3,
            }}>
            {customerDetail?.email}
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: '#717171',
              marginLeft: 20,
              marginTop: 15,
              letterSpacing: 0.3,
            }}>
            Company:
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginLeft: 20,
              letterSpacing: 0.3,
            }}>
            {customerDetail?.company_name}
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: '#717171',
              marginLeft: 20,
              marginTop: 15,
              letterSpacing: 0.3,
            }}>
            Address:
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginLeft: 20,
              height: 70,
              letterSpacing: 0.3,
            }}>
            {customerDetail?.street},{customerDetail?.town},
            {customerDetail?.area},{customerDetail?.post_code}
          </Text>
        </View>
      </View>

      {permissions?.customer?.Add && (
        <ButtonBlue
          textComponent="Update Customer"
          handleOnPress={navigateToUpdate}
        />
      )}
    </SafeAreaView>
  );
};

export default CustomerDetail;

const styles = StyleSheet.create({});
