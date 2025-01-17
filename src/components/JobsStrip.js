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
import AssignModal from './AssignModal';

const JobsStrip = ({
  firstName,
  lastName,
  email,
  phone,
  id,
  make,
  model,
  registration,
  status,
  getJobList,
  setLoading
}) => {

  const navigation = useNavigation();
  const options = ['Move to completed'];
  const [modal, setModal] = useState(false);

  const role = useSelector(state => state?.user?.role_permission?.label);
  console.log(role);



  useEffect(() => {
    // setLoading(true)
  })

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetail', id)}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#E3EDFF',
        marginHorizontal: 15,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 5,
        }}>
        <Text
          style={{
            marginTop: 5,
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
        <Text style={{color: '#333333', marginLeft: 8}}>
          {make} {model} {registration}{' '}
        </Text>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginRight: 15}}>
            {status == 1 &&
              (role == 'Technician' || role == 'Chief Technician') && (
                <TouchableOpacity
                  onPress={() => setModal(true)}
                  style={{
                    backgroundColor: '#F2F2F2',
                    padding: 2,
                    borderRadius: 5,
                    flexDirection: 'row',
                    padding: 3,
                    marginRight: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon1 name="adduser" size={20} color="black" />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 13,
                      fontWeight: '700',
                      paddingVertical: 2,
                      paddingHorizontal: 13,
                    }}>
                    In Progress
                  </Text>
                </TouchableOpacity>
              )}
          </View>
          {status == 2 &&
            (role == 'Technician' || role == 'Chief Technician') && (
            <MenuContext options={options} id={id} getJobList={getJobList} setLoading={setLoading} />
            )}
        </View>
      </View>
      {(role == 'Technician' || role == 'Chief Technician') && (
        <View>
          <Text style={{color: '#333333', marginLeft: 8, marginBottom: 10}}>
            {phone}
          </Text>
        </View>
      )}

      {modal && (
        <AssignModal
          closeEvent={() => setModal(false)}
          id={id}
          getJobList={getJobList}
        />
      )}
    </TouchableOpacity>
  );
};

export default JobsStrip;

const styles = StyleSheet.create({});
