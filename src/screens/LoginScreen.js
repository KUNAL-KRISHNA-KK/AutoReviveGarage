import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import CustomToast from '../components/Toast';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import requestUserPermission from '../firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format',
    ),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);

  const storeDataAsync = async user => {
    const jsonUser = JSON.stringify(user);
    try {
      await AsyncStorage.setItem('user', jsonUser);
    } catch (e) {
      console.log('Token not saved');
    }
  };

  const [tokenn, setTokenn] = useState({
    android: '',
    ios: '',
  });

  const getDeviceToken = async () => {
    let token: any = '';
    if (Platform.OS === 'android') {
      token = await requestUserPermission('android');
      console.log(token);
      setTokenn({
        android: token?.fcmToken,
        ios: '',
      });
    }
    if (Platform.OS === 'ios') {
      token = await requestUserPermission('ios');
      token = token ? JSON.parse(token) : '';
      setTokenn({
        android: '',
        ios: token?.fcmToken,
      });
    }
  };

  React.useEffect(() => {
    getDeviceToken();
  }, []);

  const handleLogin = async values => {
    setLoading(true);
    const postData = {
      email: values.email,
      password: values.password,
      ...tokenn,
    };

    try {
      const response = await fetch(
        'https://almysapp.com/alyms/public/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        },
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === 1) {
          // console.log(data?.data?.role_permission)
          dispatch(setUser(data.data));
          console.log(data);
          await storeDataAsync(data.data);
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
          setLoading(false);
        } else {
          console.log(data.message);
        }
      } else {
        setLoading(false);
        CustomToast('error', 'Invalid Credentials!');
        console.log('Error:', response.status, response.statusText, response);
      }
    } catch (error) {
      // Handle any network or other errors
      console.log('Error during post request:', error.message);
    }
  };

  useEffect(() => {
    setSecure(true);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View
              style={{
                alignItems: 'center',
                height: '21%',
                backgroundColor: '#344A97',
              }}>
              <Image
                source={require('../assets/Images/Splash.png')}
                style={{ marginTop: 5 }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 18,
              }}>
              <Text style={{ color: '#344A97', fontWeight: '800', fontSize: 22 }}>
                Login
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{ color: '#333333', fontSize: 16 }}>
                Kindly Enter Info to Log Into Account
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: '600',
                  marginLeft: 30,
                  marginTop: 30,
                }}>
                Username
              </Text>
            </View>
            <View>
              <TextInput placeholderTextColor="#A6AFC8"
                style={{
                  borderColor: '#C0C2C9',
                  borderWidth: 1,
                  marginHorizontal: 28,
                  marginTop: 10,
                  borderRadius: 10,
                  paddingLeft: 20,
                  height: 52,
                  color: '#000',
                }}
                placeholderTextColor={'#bbb'}
                placeholder="e,g, drakejason@.com"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: '600',
                  marginLeft: 30,
                  marginTop: 15,
                }}>
                Password
              </Text>
            </View>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderColor: '#C0C2C9',
                  borderWidth: 1,
                  marginHorizontal: 28,
                  marginTop: 10,
                  borderRadius: 10,
                  paddingLeft: 20,
                }}>
                <TextInput placeholderTextColor="#A6AFC8"
                  placeholderTextColor={'#bbb'}
                  style={{ color: '#000', width: '85%', height: 52 }}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Type password"
                  secureTextEntry={secure}
                  onBlur={handleBlur('password')}
                />
                <TouchableOpacity
                  onPress={() => setSecure(!secure)}
                  style={{ margin: 15 }}>
                  {secure ? (
                    <Icon name="eye" size={20} color="#708090" />
                  ) : (
                    <Icon name="eye-off" size={20} color="#708090" />
                  )}
                </TouchableOpacity>
              </View>

              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: 35,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={{ color: '#2357C6' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: '#344A97',
                  marginHorizontal: 30,
                  marginTop: 30,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{ margin: 12, color: 'white', fontSize: 17 }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

            {loading && (
              <View style={{ margin: 15 }}>
                <ActivityIndicator size="large" color="black" />
                {/* You can customize the loading indicator based on your design */}
              </View>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 35,
  },
});
