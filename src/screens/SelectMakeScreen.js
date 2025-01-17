import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Entypo';
import MakeStrip from '../components/MakeStrip';
import { useNavigation, useRoute } from '@react-navigation/native';
import APISERVICES from '../apiService';
import { setLocale } from 'yup';
import CustomToast from '../components/Toast';

const SelectMakeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectMake, selectMakeId } = route?.params;
  //   console.log(selectMake);
  //   console.log(selectMakeId);

  const [loading, setLoading] = useState(false);
  const [makeList, setMakeList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getMakeList = () => {
    // console.log(searchText);
    setLoading(true);
    APISERVICES.makelist
      .get(`?search=${searchText}`)
      .then(res => {
        console.log(res, 'kjhjk');
        setMakeList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMakeList();
  }, [searchText]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      {loading && (
        <View style={{ position: 'absolute', top: '40%', left: '45%' }}>
          <ActivityIndicator size={50} color="black" />
        </View>
      )}
      <View
        style={{
          height: 60,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#D0DBE8',
          borderBottomWidth: 2,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 15 }}>
          <Icon2 name="chevron-left" size={27} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontWeight: '500',
          }}>
          Select Make
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderWidth: 1.5,
          borderColor: '#D8E0E8',
          margin: 13,
          borderRadius: 10,
        }}>
        <View style={{ margin: 10 }}>
          <Icon1 name="search1" size={25} color="black" />
        </View>

        <TextInput placeholderTextColor="#A6AFC8"
          value={searchText}
          onChangeText={txt => setSearchText(txt)}
          style={{ marginLeft: 5, color: 'black', height: 52 }}

          placeholder=" Search Make..."
        />
      </View>

      <ScrollView>
        {makeList?.map(item => (
          <MakeStrip
            name={item.make}
            id={item.id}
            selectMake={selectMake}
            selectMakeId={selectMakeId}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectMakeScreen;

const styles = StyleSheet.create({});
