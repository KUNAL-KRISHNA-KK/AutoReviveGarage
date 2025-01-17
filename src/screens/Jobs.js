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
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
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
import JobsStrip from '../components/JobsStrip';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';

const Jobs = () => {
  const [onSite, setOnSite] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(1);
  const [jobs, setJobs] = useState([]);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;

  const bestFriend = useSelector(state => state.user.bestFriend);
  console.log(bestFriend);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearch('');
    setTimeout(() => {
      // console.log(status, search, 'kjhghdf');
      getJobList();
      setRefreshing(false);
    }, 1000);
  }, [search, status]);

  const getJobList = () => {
    setLoading(true);
    APISERVICES.job
      .get(
        `?status=${user?.role_permission?.label == 'In House Worker' ||
          user?.role_permission?.label == 'Out House Worker'
          ? 2
          : status
        }&search=${search}`,
      )
      .then(res => {
        setJobs(res?.data);
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isFocused) {
      getJobList();
    }
  }, [isFocused, search, status]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderDrawer title="Jobs" />

      {loading && (
        <View
          style={{ margin: 15, position: 'absolute', top: '50%', left: '42%' }}>
          <ActivityIndicator size={50} color="black" />
        </View>
      )}

      {user?.role_permission.label == 'In House Worker' ||
        user?.role_permission.label == 'Out House Worker' ? (
        <View></View>
      ) : (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomColor: '#E3EDFF',
            borderBottomWidth: 2,
          }}>
          <TouchableOpacity
            onPress={() => {
              setOnSite(true);
              setStatus(1);
              setInProgress(false);
              setCompleted(false);
            }}
            style={[styles.container, onSite && styles.withBorder]}>
            <Text style={[styles.text, onSite && styles.activeText]}>
              On site
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setInProgress(true);
              setStatus(2);
              setOnSite(false);
              setCompleted(false);
            }}
            style={[styles.container, inProgress && styles.withBorder]}>
            <Text style={[styles.text, inProgress && styles.activeText]}>
              Repair In progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCompleted(true);
              setStatus(3);
              setOnSite(false);
              setInProgress(false);
            }}
            style={[styles.container, completed && styles.withBorder]}>
            <Text style={[styles.text, completed && styles.activeText]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            margin: '4%',
            borderRadius: 10,
          }}>
          <View style={{ margin: 10 }}>
            <Icon1 name="search1" size={25} color="black" />
          </View>

          <TextInput placeholderTextColor="#A6AFC8"
            value={search}
            onChangeText={txt => setSearch(txt)}
            style={{ marginLeft: 5, color: 'black', width: '75%', height: 52 }}
            placeholder=" Search Job..."
          />

          <TouchableOpacity
            onPress={() => setSearch('')}
            style={{
              width: '15%',
              justifyContent: 'center',
              paddingLeft: 5,
              // backgroundColor: 'teal',
            }}>
            <Icon5 name="cross" size={20} color="#A6AFC8" />
          </TouchableOpacity>
        </View>
      </View>

      {jobs.length == 0 ? (
        <NotFound data="Jobs" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          {jobs?.map(item => (
            <JobsStrip
              id={item.id}
              firstName={item?.customer?.first_name}
              lastName={item?.customer?.last_name}
              make={item?.make?.make}
              model={item?.model?.model}
              registration={item?.estimateData?.registration}
              phone={item?.customer?.phone}
              status={status}
              getJobList={getJobList}
              setLoading={setLoading}
            />
          ))}
        </ScrollView>
      )}

      {permissions?.job?.Add && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateJob')}
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
    </SafeAreaView>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    width: '33%',
    alignItems: 'center',
  },
  withBorder: {
    borderBottomWidth: 3,
    borderBottomColor: '#344A97',
  },
  text: {
    marginVertical: 12,
    fontSize: 15,
    color: 'gray',
    fontWeight: '500',
  },
  activeText: {
    color: '#344A97',
  },
});
