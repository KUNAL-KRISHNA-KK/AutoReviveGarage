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
import ModelStrip from '../components/ModelStrip';
import APISERVICES from '../apiService';
import CustomToast from '../components/Toast';

const SelectModelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectModel, makeId, selectModelId } = route.params;
  console.log(makeId);
  const [loading, setLoading] = useState(false);
  const [modelList, setModelList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getModelList = () => {
    setLoading(true);
    APISERVICES.modelList
      .get(`?makeid=${makeId}&search=${searchText}`)
      .then(res => {
        console.log(res.data);
        setModelList(res.data);
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', 'Something went wrong!');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getModelList();
  }, [makeId, searchText]);

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
          Select Model
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderWidth: 1.5,
          borderColor: '#EFF2F9',
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

          placeholder=" Search Model..."
        />
      </View>

      <ScrollView>
        {modelList?.map(item => (
          <ModelStrip
            name={item.model}
            selectModel={selectModel}
            id={item.id}
            selectModelId={selectModelId}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectModelScreen;

const styles = StyleSheet.create({});
