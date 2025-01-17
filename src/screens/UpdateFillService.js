import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Entypo';
import CustomToast from '../components/Toast';

import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import ButtonBlue from '../components/ButtonBlue';

const UpdateFillService = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    setServiceCardArray,
    name,
    service_id,
    id,
    rateR,
    ratee,
    descriptionn,
    descriptionD,
    quantityQ,
    discountD,
    serviceCard,
    tempService,
  } = route.params;
  const [description, setDescription] = useState(
    descriptionn ? descriptionn : descriptionD ? descriptionD : '',
  );

  console.log(id, quantityQ, rateR, discountD, 'kky');
  const [namee, setNamee] = useState(name ? name : '');
  const [quantity, setQuantity] = useState(quantityQ ? quantityQ : '1');
  const [rate, setRate] = useState(ratee ? ratee : rateR ? rateR : '');
  const [discount, setDiscount] = useState(discountD ? discountD : '0');
  const [cardObject, setCardObject] = useState();

  console.log(name, 'NAME');

  const handleSubmit = () => {
    console.log(serviceCard, 'SERVICECARD');
    console.log(cardObject, 'CARDOBJ');

    if (rate) {
      if (serviceCard) {
        const newServices = serviceCard.filter(item => {
          if (item?.service_id === undefined) {
            return item.temp_service != cardObject?.temp_service;
          } else {
            return item?.service_id?.id != cardObject?.service_id;
          }
        });
        newServices.push(cardObject);
        setServiceCardArray(newServices);
        navigation.goBack();
      } else {
        setServiceCardArray(previous => [...previous, cardObject]);
        navigation.goBack();
      }
    } else {
      CustomToast('error', 'Please fill rate to continue!');
    }
  };

  console.log(service_id, 'SERVICEID');

  useEffect(() => {
    setCardObject({
      temp_service: service_id ? '' : namee,
      service_Id: service_id ? service_id : '',
      name: name,
      description: description,
      quantity: quantity ? quantity : '1',
      discount: discount,
      rate: rate,
      total: rate * parseFloat(quantity),
    });
  }, [description, quantity, rate, discount, service_id, namee]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          height: 60,
          backgroundColor: '#344A97',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 15 }}>
          <Icon2 name="chevron-left" size={27} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Fill Service
        </Text>
      </View>

      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          borderRadius: 15,
          margin: 20,
          borderWidth: 5,

          borderColor: '#EFF2FB',
        }}>
        <Text style={{ color: '#3D75E1', marginLeft: 15 }}>Name</Text>
        <View style={{ marginLeft: 15, marginTop: 5 }}>
          <TextInput placeholderTextColor="#A6AFC8"
            placeholder="Enter Service name"
            value={namee}
            style={{ color: 'black', fontSize: 16, height: 52 }}
            onChangeText={txt => setNamee(txt)}
            editable={tempService == true ? true : false}
          />
        </View>

        <View
          style={{
            borderBottomColor: '#E3E5EC',
            borderBottomWidth: 1,
            margin: 10,
          }}></View>

        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text style={{ color: '#3D75E1', marginLeft: 5 }}>Description</Text>

          <TextInput placeholderTextColor="#A6AFC8"
            value={description}
            multiline={true}
            onChangeText={text => setDescription(text)}
            style={{ color: 'black', fontSize: 16, height: 52 }}
            placeholder="Write Description..."

          />
        </View>
        <View
          style={{
            borderBottomColor: '#E3E5EC',
            borderBottomWidth: 1,
            marginHorizontal: 10,
          }}></View>

        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ color: '#3D75E1', width: '50%', marginLeft: 15 }}>
            Quantity
          </Text>
          <Text style={{ color: '#3D75E1' }}>Rate</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={quantity}
            onChangeText={text => {
              setQuantity(text);
            }}
            placeholder="Enter Quantity"

            keyboardType="numeric"
            style={{ color: 'black', width: '47%', marginLeft: 10, fontSize: 15, height: 52 }}
          />

          <TextInput placeholderTextColor="#A6AFC8"
            value={rate}
            onChangeText={txt => {
              const newRate = parseInt(txt);
              setRate(newRate);
            }}
            placeholder="Rate"
            keyboardType="numeric"

            style={{ color: 'black', width: '50%', marginLeft: 10, fontSize: 15, height: 52 }}
          />
        </View>
        {/* <View
          style={{
            borderBottomColor: '#E3E5EC',
            borderBottomWidth: 1,
            marginHorizontal: 10,
            marginBottom: 15,
          }}></View>

        <View style={{marginLeft: 10, marginTop: 10}}>
          <Text style={{color: '#3D75E1', marginLeft: 5}}>Discount</Text>

          <TextInput placeholderTextColor="#A6AFC8" 
            value={discount}
            keyboardType="numeric"
            onChangeText={text => setDiscount(text)}
            style={{color: 'black', fontSize: 16}}
            placeholder=" Discount..."
            
          />
        </View> */}
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            width: '60%',
            backgroundColor: '#3D75E1',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              margin: 10,
              color: 'white',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateFillService;

const styles = StyleSheet.create({});
