import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-gesture-handler';
import EstimatesStrip from '../components/EstimatesStrip';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import APISERVICES from '../apiService';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import CustomToast from '../components/Toast';
import HeaderDrawer from '../components/HeaderDrawer';
import TeamStrip from '../components/TeamStrip';
import NotFound from '../components/NotFound';
import { setBestFriend } from '../store/slices/userSlice';

const Team = () => {
  const [loading, setLoading] = useState();
  const navigation = useNavigation();
  const [teamList, setTeamList] = useState([]);
  const [searchTeam, setSearchTeam] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const focused = useIsFocused();
  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;

  const dispatch = useDispatch();

  function setBestFrienddd() {
    dispatch(setBestFriend('Vikas chhonkar'));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchTeam('');
    setTimeout(() => {
      getTeamList();
      setRefreshing(false);
    }, 1000);
  }, []);

  const getTeamList = () => {
    setLoading(true);
    APISERVICES.team
      .get(`?status=All&team=${searchTeam}`)
      .then(res => {
        setTeamList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTeamList();
    setBestFrienddd();
  }, [searchTeam, focused]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderDrawer title="Team" />

      {loading && (
        <View
          style={{ margin: 15, position: 'absolute', top: '50%', left: '48%' }}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderWidth: 1.5,
          borderColor: '#D8E0E8',
          margin: 17,
          borderRadius: 10,
        }}>
        <View style={{ margin: 10 }}>
          <Icon1 name="search1" size={25} color="black" />
        </View>

        <TextInput placeholderTextColor="#A6AFC8"
          value={searchTeam}
          onChangeText={txt => setSearchTeam(txt)}
          style={{ marginLeft: 5, color: 'black', width: '75%', height: 52 }}

          placeholder=" Search Team..."
        />

        <TouchableOpacity
          onPress={() => setSearchTeam('')}
          style={{
            width: '15%',
            justifyContent: 'center',
            paddingLeft: 5,
            // backgroundColor: 'teal',
          }}>
          <Icon5 name="cross" size={20} color="#A6AFC8" />
        </TouchableOpacity>
      </View>

      {teamList.length == 0 ? (
        <NotFound data="Teams" />
      ) : (
        <View
          style={{
            height: '82%',
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            {teamList?.map(item => (
              <TeamStrip
                id={item.id}
                name={item?.first_name + ' ' + item?.last_name}
                email={item?.email}
                phone={item?.phone}
                role={item?.roles[0]?.label}
                status={item.status}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {permissions?.team?.Add && (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTeam')}
          style={{
            backgroundColor: '#3D75E1',
            display: 'flex',
            height: 50,
            width: 50,
            borderRadius: 10,
            position: 'absolute',
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            top: '86%',
            left: '76%',
          }}>
          <Icon5 name="plus" size={32} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({});
