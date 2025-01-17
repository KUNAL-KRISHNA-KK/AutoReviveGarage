import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  ScrollViewComponent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineSlices} from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Entypo';

import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import {TextInput} from 'react-native-gesture-handler';
import EstimatesStrip from '../components/EstimatesStrip';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import APISERVICES from '../apiService';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import CustomToast from '../components/Toast';
import Header from '../components/Header';
import Divider from '../components/Divider';
import DividerSmall from '../components/DividerSmall';
import ButtonBlue from '../components/ButtonBlue';

const EstimateDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [estimateDetail, setEstimateDetail] = useState();
  const id = route.params;
  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;
  // console.log(permissions?.estimate?.Add);

  const getEstimateDetails = () => {
    setLoading(true);
    APISERVICES.estimate
      .get(id)
      .then(res => {
        // console.log(res.data);
        setEstimateDetail(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getEstimateDetails();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading && (
        <View style={{margin: 15, position: 'absolute', top: 350, left: 170}}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}

      <Header title="Estimate Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: '#344A97',
            fontSize: 17,
            fontWeight: '500',
            marginTop: 15,
            marginLeft: 15,
          }}>
          Customer details
        </Text>

        <View
          style={{
            width: '92%',
            marginLeft: 16,
            borderRadius: 5,
            borderColor: '#DCE2EC',
            borderWidth: 3,
            marginTop: 8,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%', padding: 15}}>
              <Text style={{color: '#717171', letterSpacing: 0.3}}>
                Customer Name:
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  letterSpacing: 0.3,
                }}>
                {estimateDetail?.customer[0]?.first_name}{' '}
                {estimateDetail?.customer[0]?.last_name}
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                padding: 15,
                paddingLeft: 30,
                letterSpacing: 0.3,
              }}>
              <Text style={{color: '#717171'}}>Phone No</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  letterSpacing: 0.3,
                }}>
                {estimateDetail?.customer[0]?.phone}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#717171',
                marginLeft: 20,
                marginTop: 5,
                letterSpacing: 0.3,
              }}>
              E-Mail:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginLeft: 20,
                letterSpacing: 0.3,
              }}>
              {estimateDetail?.customer[0]?.email}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: '#717171',
                marginLeft: 20,
                marginTop: 15,
                letterSpacing: 0.3,
              }}>
              Company:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginLeft: 20,
                letterSpacing: 0.3,
              }}>
              {estimateDetail?.customer[0]?.company_name}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: '#717171',
                marginLeft: 20,
                marginTop: 15,
                letterSpacing: 0.3,
              }}>
              Address:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginLeft: 20,
                height: 70,
                letterSpacing: 0.3,
              }}>
              {estimateDetail?.customer[0]?.street},{' '}
              {estimateDetail?.customer[0]?.town},{' '}
              {estimateDetail?.customer[0]?.area},{' '}
              {estimateDetail?.customer[0]?.post_code}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 20}}>
          <Divider />
        </View>

        <View
          style={{
            borderBottomColor: '#D8E0E8',
            borderBottomWidth: 2,
            backgroundColor: '',
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              color: '#344A97',
              fontSize: 17,
              fontWeight: '500',
              marginVertical: 10,
            }}>
            Vehicle details
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: '#717171',
              marginLeft: 20,
              marginTop: 15,
              letterSpacing: 0.3,
            }}>
            Vehicle Registration:
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginLeft: 20,
              letterSpacing: 0.3,
            }}>
            {estimateDetail?.registration}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
          <View style={{width: '50%', padding: 15}}>
            <Text style={{color: '#717171', letterSpacing: 0.3}}> Make:</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
                marginLeft: 5,
              }}>
              {estimateDetail?.make?.make}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
              padding: 15,
              paddingLeft: 30,
              letterSpacing: 0.3,
            }}>
            <Text style={{color: '#717171'}}>Model</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
              }}>
              {estimateDetail?.model?.model}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 5}}>
          <View style={{width: '50%', paddingLeft: 15}}>
            <Text style={{color: '#717171', letterSpacing: 0.3, marginLeft: 8}}>
              Insurance Company:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
                marginLeft: 10,
              }}>
              {estimateDetail?.customer[0]?.insurance_company}
            </Text>
          </View>
          <View style={{width: '50%', paddingLeft: 30, letterSpacing: 0.3}}>
            <Text style={{color: '#717171'}}>Policy Number</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
              }}>
              {estimateDetail?.customer[0]?.policy_number}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '50%',
            margin: 20,
            marginLeft: 28,
            letterSpacing: 0.3,
          }}>
          <Text style={{color: '#717171'}}>Paint Code </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              letterSpacing: 0.3,
            }}>
            {estimateDetail?.paint_code}
          </Text>
        </View>

        {estimateDetail?.description && (
          <View>
            <Text style={{color: '#717171', marginLeft: 25, marginTop: 15}}>
              Description
            </Text>

            <View
              style={{
                backgroundColor: '#F9F9F9',
                borderRadius: 10,
                margin: 15,
                padding: 15,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  letterSpacing: 0.4,
                  padding: 10,
                }}>
                {estimateDetail?.description}
              </Text>
            </View>
          </View>
        )}

        {estimateDetail?.Files && (
          <View>
            <View style={{backgroundColor: '#EFF2FB'}}>
              <Text
                style={{
                  color: '#344A97',
                  fontSize: 17,
                  fontWeight: '500',
                  marginVertical: 10,
                  marginLeft: 20,
                }}>
                Damage Photos
              </Text>
            </View>

            <KeyboardAwareScrollView
              horizontal
              showsHorizontalScrollIndicator={false}>
              {estimateDetail?.Files?.map(item => (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item.path);
                    navigation.navigate('ImageXL', {path: item.path});
                  }}
                  style={{marginVertical: 20, marginLeft: 20}}>
                  <Image
                    source={{uri: item.path}}
                    style={{height: 180, width: 180, borderRadius: 20}}
                  />
                </TouchableOpacity>
              ))}
            </KeyboardAwareScrollView>
          </View>
        )}

        <View style={{marginTop: 20}}>
          <View style={{backgroundColor: '#EFF2FB'}}>
            <Text
              style={{
                color: '#344A97',
                fontSize: 17,
                fontWeight: '500',
                marginVertical: 10,
                marginLeft: 20,
              }}>
              Services
            </Text>
          </View>

          {estimateDetail?.services?.map(item => (
            <View>
              <View style={{padding: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                    {item?.temp_service
                      ? item?.temp_service
                      : item?.service_id?.service}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    justifyContent: 'space-between',
                    marginRight: 30,
                  }}>
                  <View style={{flexDirection: 'row', marginLeft: 5}}>
                    <Text style={{color: 'gray', fontSize: 16, marginTop: 1}}>
                      QTY:
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: '700',
                        marginLeft: 5,
                      }}>
                      {item?.quantity}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: '17%'}}>
                    <Text style={{color: 'gray', fontSize: 16, marginTop: 1}}>
                      Rate:
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: '700',
                        marginLeft: 5,
                      }}>
                      £{item?.rate}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: '17%'}}>
                    <Text style={{color: 'gray', fontSize: 16, marginTop: 1}}>
                      Total:
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: '700',
                        marginLeft: 5,
                      }}>
                      £{item?.total}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderColor: '#D8E0E8',
                    borderWidth: 0.5,
                    marginRight: 20,
                    marginLeft: 5,
                    marginVertical: 10,
                  }}></View>

                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <Text style={{color: '#363636', fontSize: 16}}>
                    <Text
                      style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                      Description:
                    </Text>
                    {item?.description}
                  </Text>
                </View>
              </View>
              <Divider />
            </View>
          ))}
        </View>

        <View style={{backgroundColor: '#EFF2FB', paddingBottom: 15}}>
          <View style={{backgroundColor: 'white', margin: 20, padding: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontSize: 16}}>Discount</Text>
              <Text style={{color: 'black', marginRight: 10, fontSize: 16}}>
                £{estimateDetail?.net_discount}
              </Text>
            </View>
            {/* <DividerSmall /> */}
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontSize: 16}}>Net Total:</Text>
              <Text style={{color: 'black', fontSize: 16, marginRight: 10}}>
                £{estimateDetail?.net_total}
              </Text>
            </View> */}

            {/* <DividerSmall />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontSize: 16}}>VAT</Text>
              <Text style={{color: 'black', marginRight: 10, fontSize: 16}}>
                £{estimateDetail?.net_vat}
              </Text>
            </View> */}

            <DividerSmall />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  color: '#344A97',
                  fontWeight: '500',
                }}>
                Net-total:
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  color: '#344A97',
                  marginRight: 10,
                  fontWeight: '500',
                }}>
                £{estimateDetail?.net_total}
              </Text>
            </View>
          </View>
        </View>

        {permissions?.estimate?.Add && estimateDetail?.status != 'Approved' && (
          <ButtonBlue
            textComponent="Update Estimate"
            handleOnPress={() => {
              navigation.navigate('UpdateEstimate', estimateDetail);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EstimateDetail;

const styles = StyleSheet.create({
  teamText: {
    paddingHorizontal: 10,
    backgroundColor: '#E1EDFF',
    height: 30,
    borderRadius: 10,
    paddingTop: 3,
    marginLeft: 10,
    color: 'black',
  },
});
