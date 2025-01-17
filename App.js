import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Provider, useSelector } from 'react-redux';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import CodeVerification from './src/screens/ForgotPassword/CodeVerification';
import ResetPassword from './src/screens/ForgotPassword/ResetPassword';
import CreateEstimate from './src/screens/CreateEstimate';
import SelectMakeScreen from './src/screens/SelectMakeScreen';
import SelectModel from './src/screens/SelectModel';
import SelectCustomer from './src/screens/SelectCustomer';
import CustomDrawer from './src/components/CustomDrawer';
import FullEstimate from './src/screens/FullEstimate';
import WriteDescrition from './src/screens/WriteDescrition';
import FillService from './src/screens/FillService';
import AddService from './src/screens/AddService';
import Toast from 'react-native-toast-message';
import CreateCustomer from './src/screens/CreateCustomer';
import Customers from './src/screens/Customers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Jobs from './src/screens/Jobs';
import Team from './src/screens/Team';
import EstimateDetail from './src/screens/EstimateDetail';
import TeamDetails from './src/screens/TeamDetails';
import AddTeam from './src/screens/AddTeam';
import UpdateEstimate from './src/screens/UpdateEstimate';
import UpdateFullEstimate from './src/screens/UpdateFullEstimate';
import UpdateTeam from './src/screens/UpdateTeam';
import CustomerDetail from './src/screens/CustomerDetail';
import UpdateCustomer from './src/screens/UpdateCustomer';
import JobDetail from './src/screens/JobDetail';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import Profile from './src/screens/Profile';
import CreateJob from './src/screens/CreateJob';
import CreateFullJob from './src/screens/CreateFullJob';
import UpdateJob from './src/screens/UpdateJob';
import UpdateFullJob from './src/screens/UpdateFullJob';
import UpdateFillService from './src/screens/UpdateFillService';
import ImageXL from './src/screens/ImageXL';

import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/store';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const getDeviceToken = async () => {
    let token = '';
    if (Platform.OS === 'android') {
      token = await requestUserPermission('android');
      console.log(token);
    }
    if (Platform.OS === 'ios') {
      token = await requestUserPermission('ios');
      token = token ? JSON.parse(token) : '';
      console.log(token, 'ios_token');
    }
  };

  React.useEffect(() => {
    getDeviceToken();
  }, []);

  return (
    <Stack.Navigator
      // initialRouteName='TeamDetails'
      screenOptions={{
        headerShown: false, // Hide headers for all screens
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={TabNavigation} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CodeVerification" component={CodeVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CreateEstimate" component={CreateEstimate} />
      <Stack.Screen name="SelectMakeScreen" component={SelectMakeScreen} />
      <Stack.Screen name="SelectModel" component={SelectModel} />
      <Stack.Screen name="SelectCustomer" component={SelectCustomer} />
      <Stack.Screen name="WriteDescrition" component={WriteDescrition} />
      <Stack.Screen name="FullEstimate" component={FullEstimate} />
      <Stack.Screen name="FillService" component={FillService} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="CreateCustomer" component={CreateCustomer} />
      <Stack.Screen name="EstimateDetail" component={EstimateDetail} />
      <Stack.Screen name="TeamDetails" component={TeamDetails} />
      <Stack.Screen name="AddTeam" component={AddTeam} />
      <Stack.Screen name="UpdateEstimate" component={UpdateEstimate} />
      <Stack.Screen name="UpdateFullEstimate" component={UpdateFullEstimate} />
      <Stack.Screen name="UpdateTeam" component={UpdateTeam} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
      <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />
      <Stack.Screen name="JobDetail" component={JobDetail} />
      <Stack.Screen name="Team" component={Team} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="CreateJob" component={CreateJob} />
      <Stack.Screen name="CreateFullJob" component={CreateFullJob} />
      <Stack.Screen name="UpdateJob" component={UpdateJob} />
      <Stack.Screen name="UpdateFullJob" component={UpdateFullJob} />
      <Stack.Screen name="UpdateFillService" component={UpdateFillService} />
      <Stack.Screen name="ImageXL" component={ImageXL} />

      {/* <Stack.Screen name="Customers" component={Customers} /> */}
    </Stack.Navigator>
  );
};

function TabNavigation() {
  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 63,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'wallet';
          if (route.name === 'Customers') {
            iconName = 'person-circle';
          } else if (route.name === 'Estimates') {
            iconName = 'wallet-sharp';
          } else if (route.name === 'Jobs') {
            iconName = 'newspaper-sharp';
          } else if (route.name === 'Team') {
            iconName = 'people-sharp';
          }
          return <Ionicons name={iconName} size={32} color={color} />;
        },
        tabBarActiveTintColor: '#001e3c',
        tabBarInactiveTintColor: 'gray',
      })}>
      {permissions?.team?.Show && <Tab.Screen name="Team" component={Team} />}

      {permissions?.customer?.Show && (
        <Tab.Screen name="Customers" component={Customers} />
      )}
      {permissions?.estimate?.Show && (
        <Tab.Screen name="Estimates" component={HomeScreen} />
      )}

      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Provider store={store}>
        <MenuProvider>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="HomeStack"
              drawerContent={evt => {
                return <CustomDrawer />;
              }}
              screenOptions={{
                swipeEnabled: false,
                headerShown: false,
                drawerPosition: 'left',
                headerStyle: {
                  backgroundColor: '#F5F7FB',
                },
                headerTitleAlign: 'left',
                headerTintColor: '#000000',
              }}>
              <Drawer.Screen name="Estimates" component={HomeStack} />
              <Drawer.Screen name="TabNavigation" component={TabNavigation} />
            </Drawer.Navigator>
          </NavigationContainer>
        </MenuProvider>
        <Toast />
      </Provider>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({});
