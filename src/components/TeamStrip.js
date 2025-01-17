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
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import MenuContext from './Menu';

const TeamStrip = ({name, email, phone, id, role, status}) => {
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const newData = {};

  const getStatus = () => {
    if (status == 1) {
      return 'Active';
    } else if (status == 0) {
      return 'Inactive';
    } else {
      return 'Pending';
    }
  };

  const setBg = () => {
    if (status == 1) {
      return '#E2F6F0';
    } else if (status == 2) {
      return '#FEF2E1';
    } else {
      return '#FFCCCC';
    }
  };

  const setColor = () => {
    if (status == 1) {
      return '#0D825B';
    } else if (status == 2) {
      return '#BA5115';
    } else {
      return 'red';
    }
  };

  // const handleRemove = () => {
  //   Alert.alert(
  //     'Confirm Deletion',
  //     'Are you sure you want to delete this estimate?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           console.log('Cancel Pressed');
  //           setMenu(false);
  //         },
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           setLoading(true);
  //           setMenu(!menu);
  //           APISERVICES.team.delete(id)
  //             .then(res => {
  //               console.log(res);
  //             })
  //             .then(err => {
  //               console.log(err);
  //             })
  //             .finally(() => {
  //               setLoading(false);
  //               if (onSuccess) onSuccess();
  //             });
  //         },
  //         style: 'destructive',
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TeamDetails', id)}
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
            marginTop: 5,
            marginLeft: 5,
            fontWeight: '500',
            fontSize: 16,
            color: 'black',
          }}>
          {name}
        </Text>
        <Text style={{marginRight: 15, color: '#333333'}}>{role}</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#333333', marginLeft: 8, fontSize: 13}}>
          {phone}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View
            style={{
              marginRight: 15,
              backgroundColor: setBg(),
              paddingVertical: 2,
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginBottom: 7,
            }}>
            <Text
              style={{
                color: setColor(),
                fontSize: 13,
                paddingVertical: 1.5,
                fontWeight: '700',
              }}>
              {getStatus()}
            </Text>
          </View>

          {/* <MenuContext options={['Edit Team']} /> */}

          {/* <TouchableOpacity
            disabled={true}
            onPress={() => setMenu(!menu)}
            style={{paddingHorizontal: 10}}>
            <Icon2 name="dots-three-vertical" size={20} color="black" />
          </TouchableOpacity> */}
        </View>
      </View>
      {/* <View>
        <Text style={{color: '#333333', marginLeft: 8, marginBottom: 10}}>
          {phone}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default TeamStrip;

const styles = StyleSheet.create({});
