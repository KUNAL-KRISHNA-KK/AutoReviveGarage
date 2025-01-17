import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import HeaderDrawer from '../components/HeaderDrawer';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TextInput } from 'react-native-gesture-handler';
import ButtonBlue from '../components/ButtonBlue';
import { useDispatch, useSelector } from 'react-redux';
import APISERVICES from '../apiService';
import { applyMiddleware } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { commonStyles } from '../constants/styles';
import CustomToast from '../components/Toast';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../store/slices/userSlice';

const Profile = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [firstName, setFirstName] = useState(
    user?.first_name ? user?.first_name : '',
  );
  const [lastName, setLastName] = useState(
    user?.last_name ? user?.last_name : '',
  );
  const [email, setEmail] = useState(user?.email ? user?.email : '');
  const [phone, setPhone] = useState(user?.phone ? user?.phone : '');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    setLoading(true);
    apiData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    };
    APISERVICES.team
      .put(user?.id, apiData)
      .then(res => {
        console.log(res);
        CustomToast('success', 'user updated!!');
        const updatedUser = {
          ...user,
          first_name: res?.data?.first_name,
          last_name: res?.data?.last_name,
          phone: res?.data?.phone,
          email: res?.data?.email,
        };
        dispatch(setUser(updatedUser));
        navigation.goBack();
      })
      .catch(err => {
        CustomToast('error', err.message);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title="Profile" />
      {loading && (
        <View style={{ margin: 15, position: 'absolute', top: 350, left: 170 }}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}

      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            width: 150,
            backgroundColor: 'black',
            borderRadius: 100,
          }}>
          <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>
            {firstName[0] + lastName[0]}
          </Text>
        </View>
      </View>

      <KeyboardAwareScrollView>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 17,
            marginLeft: 22,
            marginTop: 40,
          }}>
          First Name
        </Text>

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
            marginTop: 5,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
            }}
            style={{ marginLeft: 15, color: 'black', width: '90%', height: 52 }}

            placeholder="First Name"
            editable={true}
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 17,
            marginLeft: 22,
            marginTop: 7,
          }}>
          Last Name
        </Text>

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
            marginTop: 5,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={lastName}
            onChangeText={text => {
              setLastName(text);
            }}
            style={{ marginLeft: 15, color: 'black', width: '90%', height: 52 }}

            placeholder="Last Name"
            editable={true}
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 17,
            marginLeft: 22,
            marginTop: 7,
          }}>
          Email
        </Text>

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
            marginTop: 5,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            style={{ marginLeft: 15, color: 'black', width: '90%', height: 52 }}

            placeholder="Email"
            editable={true}
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 17,
            marginLeft: 22,
            marginTop: 7,
          }}>
          Phone
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginTop: 5,
            marginBottom: 10,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={phone}
            onChangeText={text => {
              setPhone(text);
            }}
            style={{ marginLeft: 15, color: 'black', width: '90%', height: 52 }}

            placeholder="Phone"
            editable={true}
            maxLength={10}
          />
        </View>
        <View style={{ marginTop: 7 }}>
          <ButtonBlue textComponent="Update" handleOnPress={handleUpdate} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
