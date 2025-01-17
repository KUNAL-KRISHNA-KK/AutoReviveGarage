import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
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
import CustomerStrip from '../components/CustomerStrip';
import FullEstimateCard from '../components/FullEstimateCard';
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import AddService from './AddService';
import FillService from './FillService';
import ButtonBlue from '../components/ButtonBlue';
import APISERVICES from '../apiService';
import CustomToast from '../components/Toast';
import HomeScreen from './HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../constants/styles';

const UpdateFullEstimate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { services, ApiData, photos, data } = route.params;

  // console.log(data?.net_discount, 'zz');

  const company_type = data?.customer[0]?.company_type;
  const id = data?.id;

  const [serviceCard, setServiceCard] = useState(
    data?.services
      ? data?.services
      : [
        {
          id: '',
          temp_service: '',
          estimate_id: id,
          deleted_at: null,
          description: 'default ',
          name: 'PARTS ',
          quantity: '1',
          rate: 100,
          service_id: 1,
          total: 100,
          discount: 50,
        },
      ],
  );
  const [adjustment, setAdjustment] = useState(0);
  const [loading, setLoading] = useState(false);
  const [discountt, setDiscountt] = useState(
    data?.net_discount?.toString() || 0,
  );

  const removeServiceItem = index => {
    const updatedServiceArray = [...serviceCard];
    updatedServiceArray.splice(index, 1);
    setServiceCard(updatedServiceArray);
  };

  const setServiceCardArray = item => {
    setServiceCard(item);
    // console.log(item, 'kkk');xc
  };

  const countDiscount = () => {
    let fullDiscount = 0;
    serviceCard.map(item => {
      fullDiscount += parseFloat(item.discount);
    });
    return fullDiscount;
  };

  const countSubTotal = () => {
    let subtotal = 0;
    serviceCard.map(item => {
      subtotal += item.rate * parseFloat(item.quantity);
    });
    return subtotal - discountt;
  };

  const netTotal = countSubTotal();
  const grandTotal = 1.2 * countSubTotal();
  const vat = 0.2 * countSubTotal();
  const netDiscount = discountt;

  const imageIdArray = () => {
    const idArray = [];
    photos?.map(item => {
      idArray?.push({
        id: item.id,
      });
    });
    return idArray;
  };

  /////////////////////////////////////PREPARE SERVICE DATA FOR POST ///////////////////////////////////////

  const prepareServiceForApi = () => {
    const servicesForApi = [];
    // console.log(serviceCard, 'dalla');
    serviceCard.map(item => {
      const objService = {
        id: '',
        temp_service: item?.temp_service ? item?.temp_service : '',
        estimate_id: item?.estimate_id,
        deleted_at: null,
        description: item?.quantityitem?.description,
        quantity: item?.quantity,
        rate: item?.rate,
        service_id: item?.service_id?.id
          ? item?.service_id?.id
          : item?.service_id,
        total: item?.total,
        discount: item?.discount,
      };

      servicesForApi.push(objService);
    });
    return servicesForApi;
  };

  /////////////////////////////////////////UPDATE API ///////////////////////////////////////////////////////

  const fullApiData = {
    ...ApiData,
    files: imageIdArray(),
    services: prepareServiceForApi(),
    net_total: netTotal,
    net_discount: netDiscount,
    net_vat: vat,
    grand_total: grandTotal,
    paint_code: ApiData?.paint_code || '',
  };

  const updateEstimate = () => {
    setLoading(true);
    APISERVICES.estimate
      .put(id, fullApiData)
      .then(res => {
        CustomToast('success', 'Estimate Updated!');
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSaveDraft = () => {
    updateEstimate();
  };

  useEffect(() => {
    countSubTotal();
  }, [serviceCard, adjustment, discountt]);

  /////////////////////////////////////////////////// GETTING SERVICES NAME LIST/////////////////////////////////////

  const [servicess, setServicess] = useState();

  const getServices = () => {
    setLoading(true);
    APISERVICES.const
      .get(`?company_type=${company_type}`)
      .then(res => {
        // console.log(res?.data?.service, 'KKKKZZZZ');
        setServicess(res?.data?.service);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getServices();
  }, []);

  const renderItem = ({ item }) => {
    // console.log(item, 'zz');
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UpdateFillService', {
            serviceCard: serviceCard,
            setServiceCardArray: setServiceCardArray,
            name: item.service,
            service_id: item.service_id?.id,
            id: item.id,
            ratee: item?.rate,
            descriptionn: item?.description,
          })
        }
        style={{
          alignItems: 'center',
          width: '31%',
          marginLeft: '1.5%',
          marginVertical: 5,
          backgroundColor: 'white',
          borderRadius: 7,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 14.5,
              marginHorizontal: 5,
              color: 'black',
              marginVertical: 7,
            }}>
            {item.service}
          </Text>
        </ScrollView>
      </TouchableOpacity>
    );
  };

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
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Update Estimate
        </Text>
      </View>

      <View style={{ backgroundColor: '#EFF2FB', paddingBottom: 10 }}>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={servicess}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
          />
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UpdateFillService', {
                  setServiceCardArray: setServiceCardArray,
                  serviceCard: serviceCard,
                  tempService: true,
                })
              }
              style={{
                backgroundColor: Colors.bestColor,
                display: 'flex',
                height: 35,
                marginTop: 10,
                marginLeft: 13,
                width: '27%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ alignItems: "flex-end", marginRight: 20 }}>
                      <TouchableOpacity onPress={() => navigation.navigate(AddService)}
                          style={{ height: 40, width: 40, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 8, margin: 5, marginLeft: 15, borderColor: "#3D75E1", borderWidth: 2 }}>
                          <Icon name="plus" size={20} color="#3D75E1" />
                      </TouchableOpacity>
                  </View> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        {serviceCard.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateFillService', {
                serviceCard: serviceCard,
                setServiceCardArray: setServiceCardArray,
                name: item?.temp_service
                  ? item?.temp_service
                  : item.name
                    ? item.name
                    : item?.service_id?.service,
                service_id: item.service_id?.id,
                rateR: item.rate.toString(),
                quantityQ: item.quantity,
                descriptionD: item.description,
                discountD: item.discount,
              });
            }}>
            <FullEstimateCard
              name={
                item?.temp_service
                  ? item?.temp_service
                  : item?.name
                    ? item?.name
                    : item?.service_id?.service
              }
              index={index}
              rate={item.rate}
              quantity={item.quantity}
              removeServiceItem={removeServiceItem}
              description={item.description}
              discount={item.discount}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View
        style={{ backgroundColor: '#EFF2FB', paddingVertical: 5, marginTop: 10 }}>
        <View
          style={{
            color: 'black',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 25,
            marginRight: 15,
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 15 }}>Discount</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
              width: 60,
            }}>
            <Text style={{ marginRight: 10, color: 'black', fontSize: 15 }}>
              £
            </Text>
            <TextInput placeholderTextColor="#A6AFC8"

              placeholder="0.00"
              value={discountt}
              onChangeText={txt => setDiscountt(txt)}
              inputMode="numeric"
              style={{
                backgroundColor: 'transparent',
                color: 'black',
                fontSize: 15,
                width: 50,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5, height: 52
              }}
            />
          </View>
        </View>

        {/* <View
          style={{
            borderBottomColor: '#0000001F',
            borderBottomWidth: 1,
            marginHorizontal: 30,
          }}></View>
        <View
          style={{
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginHorizontal: 25,
          }}>
          <Text style={{color: 'black', fontSize: 15}}>Net Total</Text>
          <Text style={{color: 'black', fontSize: 15}}>£{countSubTotal()}</Text>
        </View> */}

        <View
          style={{
            borderBottomColor: '#0000001F',
            borderBottomWidth: 1,
            marginHorizontal: 30,
          }}></View>

        {/* <View
          style={{
            color: 'black',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 25,
            marginRight: 15,
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 15}}>VAT(20%)</Text>
          <Text style={{marginRight: 10, color: 'black', fontSize: 15}}>
            £{(0.2 * countSubTotal()).toFixed(2)}
          </Text>
        </View> */}
        <View
          style={{
            borderBottomColor: '#0000001F',
            borderBottomWidth: 1,
            marginHorizontal: 30,
          }}></View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
            marginHorizontal: 25,
          }}>
          <Text style={{ color: '#344A97', fontSize: 15, fontWeight: '500' }}>
            Grand Total
          </Text>
          <Text style={{ color: '#344A97', fontSize: 15, fontWeight: '500' }}>
            £{countSubTotal()}
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <ButtonBlue
            textComponent="Save Draft"
            handleOnPress={handleSaveDraft}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateFullEstimate;

const styles = StyleSheet.create({});
