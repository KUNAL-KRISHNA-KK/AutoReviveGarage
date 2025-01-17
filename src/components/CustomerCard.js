import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineSlices} from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import APISERVICES from '../apiService';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const CustomerCard = ({
  firstName,
  lastName,
  email,
  phone,
  id,
  onSuccess,
  role,
  draft,
}) => {
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRemove = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this customer?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
            setMenu(false);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setLoading(true);
            setMenu(!menu);
            APISERVICES.customer
              .delete(id)
              .then(res => {
                console.log(res);
              })
              .then(err => {
                console.log(err);
              })
              .finally(() => {
                setLoading(false);
                if (onSuccess) onSuccess();
              });
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CustomerDetail', id)}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#E3EDFF',
        marginHorizontal: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 3,
        }}>
        <Text
          style={{
            marginLeft: 5,
            fontWeight: '500',
            fontSize: 16,
            color: 'black',
          }}>
          {firstName} {lastName && lastName}
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#333333', marginLeft: 8, fontSize: 13}}>
          {email}
        </Text>

        <View style={{display: 'flex', flexDirection: 'row', marginRight: 5}}>
          <Text style={{color: '#333333', fontSize: 13}}>{role}</Text>

          {/* <TouchableOpacity
                        onPress={() => setMenu(!menu)}
                        style={{ paddingHorizontal: 10 }}>
                        <Icon2 name="dots-three-vertical" size={20} color="black" />
                    </TouchableOpacity> */}
        </View>
      </View>
      <View>
        <Text style={{color: '#333333', marginLeft: 8, marginBottom: 10}}>
          {phone}
        </Text>
      </View>
      {/* {menu && (
                <TouchableOpacity
                    // onPress={handleRemove}
                    style={{
                        paddingHorizontal: 25,
                        elevation: 5,
                        backgroundColor: 'white',
                        paddingVertical: 8,
                        position: 'absolute',
                        top: '32%',
                        left: '68%',
                    }}>
                    <Text style={{ color: 'black', fontWeight: '500' }}>Delete</Text>
                </TouchableOpacity>
            )} */}
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({});
