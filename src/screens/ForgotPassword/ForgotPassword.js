import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
// import CustomToast from '../../components/Toast';
import ButtonBlue from '../../components/ButtonBlue';
import Icon5 from 'react-native-vector-icons/Ionicons';
import APISERVICES from '../../apiService';
import Icon4 from 'react-native-vector-icons/AntDesign';
import LoginScreen from '../LoginScreen';

import { Formik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import CustomToast from '../../components/Toast';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [changedPassword, setChangedPassword] = useState(false);

  const navigation = useNavigation();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email format',
      ),
  });

  const onpressEvent = values => {
    setLoading(true);
    APISERVICES.forgot
      .post({
        email: values.email,
        url: 'https://almysauto.webwatt.com/auth/reset-password/',
      })
      .then(res => {
        console.log(res);
        setChangedPassword(true);
        // CustomToast('success', "4 digit code is sent to your email")
        // navigation.navigate('CodeVerification')
      })
      .catch(err => {
        console.log(err);
        CustomToast('info', err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View>
      <Formik
        initialValues={{ email: '99kunalkrishna99@gmail.com' }}
        onSubmit={onpressEvent}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={{ flexDirection: 'row', margin: 2 }}>
                <View style={{ margin: 15 }}>
                  <Icon5 name="arrow-back" size={27} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: '37%' }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30 }}>
                Forgot password
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: 'gray' }}>Enter your Email. You will</Text>
              <Text style={{ color: 'gray' }}>
                receive a code to create a new password.
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#F0F0F0',
                marginHorizontal: 20,
                borderRadius: 8,
                marginTop: 20,
              }}>
              <TextInput placeholderTextColor="#A6AFC8"
                style={{ marginLeft: 20, color: 'black', height: 52 }}
                placeholder="Enter your email address"
                onBlur={handleBlur('email')}
                value={values.email}
                onChangeText={handleChange('email')}

              />
            </View>
            {touched.email && errors.email && (
              <Text
                style={{
                  color: 'red',
                  marginTop: 4,
                  marginLeft: 30,
                  fontSize: 13,
                }}>
                {errors.email}
              </Text>
            )}
            <View className="mt-5 ml-4">
              <ButtonBlue textComponent="Submit" handleOnPress={handleSubmit} />
            </View>

            {/* Add submit button */}
            {loading ? (
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <ActivityIndicator size={50} color="black" />
              </View>
            ) : (
              <View />
            )}

            <SaveDrillModal
              showModal={changedPassword}
              navigation={navigation}
              changedPassword={changedPassword}
              setChangedPassword={setChangedPassword}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export const SaveDrillModal = ({
  showModal,
  navigation,
  changedPassword,
  setChangedPassword,
}) => {
  const okayButton = () => {
    setChangedPassword(!changedPassword);
    navigation.navigate(LoginScreen);
  };

  return (
    <SafeAreaView>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.iconContainer}>
              <Icon4 name="checkcircleo" size={55} color="#2357C6" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.modalTitle}>Password reset link sent to</Text>
              <Text style={styles.modalTitle}>your email!</Text>

              <View style={{ marginTop: 15 }}>
                <Text style={styles.modalText}>
                  You can change your password from
                </Text>
                <Text style={styles.modalText}>email and then login!</Text>
              </View>
            </View>
            <View style={{ display: 'flex' }}>
              <ButtonBlue textComponent="Okay" handleOnPress={okayButton} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  headerButton: {
    flexDirection: 'row',
    margin: 2,
  },
  headerIcon: {
    marginTop: 1,
  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 2,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  titleText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    color: 'gray',
  },
  inputContainer: {
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  input: {
    marginHorizontal: 10,
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginLeft: 30,
    fontSize: 13,
  },
  buttonContainer: {
    marginTop: 20,
    // marginHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    height: '37%',
    backgroundColor: 'white',
    marginLeft: '10%',
    borderRadius: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '12%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  modalTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
  },
  modalText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '7%',
    marginRight: '5%',
  },
});
