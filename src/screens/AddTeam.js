import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import APISERVICES from '../apiService';
import CustomToast from '../components/Toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonBlue from '../components/ButtonBlue';
import { ComposedGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';

const AddTeam = () => {
  const [loading, setLaoding] = useState(false);
  const navigation = useNavigation();
  // const [role, setRole] = useState('');
  const [apiRole, setApiRole] = useState('');
  const user = useSelector(state => state.user);
  console.log(user.role);

  const validationSchema = yup.object().shape({
    role: yup.string().required('Role is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    mobile: yup
      .string()
      .required('Mobile number is required')
      .matches(/^\d{11}$/, 'Mobile number must be exactly 11 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const createTeam = () => {
    setLaoding(true);
    const apiData = {
      first_name: formik.values.firstName,
      last_name: formik.values.lastName,
      email: formik.values.email,
      phone: formik.values.mobile,
      role: apiRole,
      url: 'https://almys-autos.webwatt.com/auth/reset-password/',
    };

    // console.log(apiData);

    APISERVICES.team
      .post(apiData)
      .then(res => {
        console.log(res);
        CustomToast('success', res.message);
        navigation.navigate('Team');
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', err.message);
      })
      .finally(() => setLaoding(false));
  };

  const formik = useFormik({
    initialValues: {
      role: '',
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
    },

    validationSchema: validationSchema,

    onSubmit: async values => {
      // console.log(values);
      createTeam();
    },
  });

  const selectionData = [
    {
      key: 'chief',
      value: 'In House Worker',
    },
    {
      key: 'technician',
      value: 'Out House Worker',
    },
  ];

  // console.log(formik.values.rolerole, apiRole);

  useEffect(() => {
    if (user?.role == 'Chief Technician') {
      selectionData.push({
        key: 'technician',
        value: 'Technician',
      });
    }
  }, []);

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <Header title="Add Team" />
      <View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '500',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            Role
          </Text>
        </View>
        {
          <View>
            <SelectList
              value={formik.values.role}
              placeholder="Select Role"
              search={false}
              setSelected={val => {
                formik.handleChange('role')(val);
                setApiRole(val);
              }}
              boxStyles={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#EFF2FB',
                marginHorizontal: 20,
                borderRadius: 10,
                justifyContent: 'space-between',
                marginVertical: 10,
                borderWidth: 0,
                paddingVertical: 15,
              }}
              defaultValue={1}
              inputStyles={{
                // additional styles for the text of selection box
                color: 'black',
                fontSize: 15,
                // fontWeight: "500"
              }}
              dropdownStyles={{
                // additional styles for the dropdown scrollview
                marginHorizontal: 20,
                marginTop: -5,
                borderWidth: 0,
                backgroundColor: '#EFF2FB',
                elevation: 7,
              }}
              dropdownItemStyles={
                {
                  // additional styles for the dropdown single list item
                }
              }
              dropdownTextStyles={{
                // additional styles for the dropdown list items text
                color: 'black',
                fontSize: 15,
              }}
              data={selectionData}
              save="value"
              arrowicon={<Icon2 name="chevron-down" size={20} color="black" />}
            />
          </View>
        }
      </View>

      {formik.touched.role && formik.errors.role && (
        <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
          {formik.errors.role}
        </Text>
      )}

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ width: '49%' }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 10,
                fontWeight: '500',
              }}>
              First Name
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              marginHorizontal: 20,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              // onBlur={handleBlur('firstName')}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="First name.."
            />
          </View>
          {formik.touched.firstName && formik.errors.firstName && (
            <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
              {formik.errors.firstName}
            </Text>
          )}
        </View>

        <View style={{ width: '49%' }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginTop: 20,
                marginBottom: 10,
                fontWeight: '500',
              }}>
              Last Name
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              // marginHorizontal: 20,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="Last name.."
            />
          </View>
          {formik.touched.lastName && formik.errors.lastName && (
            <Text style={{ color: 'red', marginLeft: 5, fontSize: 13 }}>
              {formik.errors.lastName}
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          marginLeft: 20,
          marginRight: 10,
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              marginTop: 20,
              marginBottom: 10,
              fontWeight: '500',
            }}>
            Phone
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#EFF2FB',
              width: '15%',
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }}>
              +44
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              width: '80%',
              marginLeft: 5,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.mobile}
              onChangeText={formik.handleChange('mobile')}
              onBlur={formik.handleBlur('mobile')}
              keyboardType="numeric"
              maxLength={11}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="123..."
            />
          </View>
        </View>
      </View>

      {formik.touched.mobile && formik.errors.mobile && (
        <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
          {formik.errors.mobile}
        </Text>
      )}

      <View
        style={{
          marginLeft: 20,
          marginRight: 10,
          marginTop: 10,
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              marginTop: 20,
              marginBottom: 10,
              fontWeight: '500',
            }}>
            Email Address
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#EFF2FB',
            // marginHorizontal: 20,
            marginRight: 15,
            borderWidth: 0,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

            placeholder="Email Address"
            keyboardType='email-address'
          />
        </View>
        {formik.touched.email && formik.errors.email && (
          <Text style={{ color: 'red', marginLeft: 7, fontSize: 13 }}>
            {formik.errors.email}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#2357C6',
          height: 50,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
        onPress={formik.handleSubmit}>
        <Text
          className="font-semibold text-white"
          style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
          Send Invitation
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={{ position: 'absolute', top: '40%', left: '45%' }}>
          <ActivityIndicator size={50} color="black" />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default AddTeam;

const styles = StyleSheet.create({});
