import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DrawerButton from './DrawerButton';
import {Drawer} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomDrawer({route}) {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(0);

  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;

  const on_logout = async () => {
    console.log('logout...');
  };

  const storeDataAsync = async token => {
    try {
      await AsyncStorage.setItem('isLoggedIn', token);
    } catch (e) {
      console.log('Token not saved');
    }
  };

  const clearAsyncData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Async data cleared successfully');
    } catch (error) {
      console.error('Error clearing async data:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <View
            style={{
              backgroundColor: '#344A97',
              height: '25%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Image source={require('../assets/Images/Splash.png')} />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#001e3c',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 500,
                  margin: 10,
                }}>
                {user?.first_name} {user?.last_name}
                {'('}
                {user.role}
                {')'}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}>
                <MaterialCommunityIcons
                  name="account-edit"
                  size={22}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-5">
            {permissions?.team?.Show && (
              <DrawerButton
                ButtonText="Teams"
                handleOnPress={() => navigation.navigate('Team')}
              />
            )}

            {permissions?.customer?.Show && (
              <DrawerButton
                ButtonText="Customers"
                handleOnPress={() => navigation.navigate('Customers')}
              />
            )}

            {permissions?.estimate?.Show && (
              <DrawerButton
                ButtonText="Estimates"
                handleOnPress={() => navigation.navigate('Estimates')}
              />
            )}

            {permissions?.job?.Show && (
              <DrawerButton
                ButtonText="Jobs"
                handleOnPress={() => navigation.navigate('Jobs')}
              />
            )}

            <DrawerButton
              ButtonText="Logout"
              handleOnPress={() => {
                clearAsyncData();
                navigation.navigate('SplashScreen');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'SplashScreen'}],
                });
              }}
            />
          </View>
          <View style={styles.line} />
        </View>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  selectedTab: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,

    borderRadius: 2,
  },
  h1: {
    backgroundColor: '#EEEFF8',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  unselectedTab: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 6,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    marginLeft: 5,
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  userProfileName: {
    borderColor: '#081E37',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 40,
  },
  title: {
    marginLeft: 15,
    fontWeight: '500',
  },
  h2Title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerBackground: {
    height: Platform.OS === 'android' ? 120 : 120,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  subHeaderText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 5,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#4B4B4B',
  },
  editProfileButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 16,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 25,
  },
  versionLogo: {
    height: 80,
    width: 150,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  versionText: {
    color: '#808080',
  },
  line: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    // marginVertical: '15%',
  },
});
