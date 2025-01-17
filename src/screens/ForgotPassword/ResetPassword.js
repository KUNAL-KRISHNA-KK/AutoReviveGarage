import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Ionicons';
import ButtonBlue from '../../components/ButtonBlue';
import LoginScreen from '../LoginScreen';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

const ResetPassword = () => {
  const navigation = useNavigation();

  const [changedPassword, setChangedPassword] = useState(false);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onpressEvent = () => {
    setChangedPassword(!changedPassword);
  };

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={onpressEvent}
      validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CodeVerification')}
              style={styles.headerButton}>
              <View style={{ margin: 15 }}>
                <Icon5 name="arrow-back" size={27} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Enter new Password</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Your new password must be different
            </Text>
            <Text style={styles.infoText}>from previously used password.</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholderTextColor="#A6AFC8"
              style={styles.input}
              placeholder="Enter new password"
              onBlur={handleBlur('password')}
              value={values.password}
              onChangeText={handleChange('password')}

              secureTextEntry
            />
          </View>
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput placeholderTextColor="#A6AFC8"
              style={styles.input}
              placeholder="Confirm password"
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}

              secureTextEntry
            />
          </View>
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <View style={styles.buttonContainer}>
            <ButtonBlue
              textComponent="Verify and Proceed"
              handleOnPress={handleSubmit}
            />
          </View>

          <SaveDrillModal
            showModal={changedPassword}
            navigation={navigation}
            changedPassword={changedPassword}
            setChangedPassword={setChangedPassword}
          />
        </View>
      )}
    </Formik>
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
              <Text style={styles.modalTitle}>Your password has been</Text>
              <Text style={styles.modalTitle}>changed!</Text>

              <View style={{ marginTop: 15 }}>
                <Text style={styles.modalText}>
                  Your password has been changed
                </Text>
                <Text style={styles.modalText}>
                  successfully, do you want to log in too?
                </Text>
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

export default ResetPassword;

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
    color: 'black', height: 52
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
