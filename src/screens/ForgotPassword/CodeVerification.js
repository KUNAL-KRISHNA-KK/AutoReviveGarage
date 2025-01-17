import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import ButtonBlue from '../../components/ButtonBlue';
import Icon5 from 'react-native-vector-icons/Ionicons';

const CodeVerification = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  const onPressEvent = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <View style={{ margin: 15 }}>
            <Icon5 name="arrow-back" size={27} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Get Your Code</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Enter the 4-digit code received in</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.infoText}>registered email id</Text>
          <TouchableOpacity>
            <Text style={[styles.infoText, styles.editLink]}>edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholderTextColor="#A6AFC8"
          style={styles.input}
          placeholder="Enter your 4 digit code"

          keyboardType="number-pad"
          maxLength={4}
        />
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>If you don't receive code</Text>
        <TouchableOpacity>
          <Text style={[styles.resendText, styles.resendLink]}>Resend</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonBlue
          textComponent="Verify and Proceed"
          handleOnPress={onPressEvent}
        />
      </View>
    </SafeAreaView>
  );
};

export default CodeVerification;

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
  backButton: {
    flexDirection: 'row',
    margin: 2,
  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  editLink: {
    textDecorationLine: 'underline',
    color: 'black',
    marginLeft: 5,
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
    height: 52
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    color: 'gray',
  },
  resendLink: {
    color: 'red',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
