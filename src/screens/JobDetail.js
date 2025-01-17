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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Entypo';
import dayjs from 'dayjs';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon5 from 'react-native-vector-icons/Entypo';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import EstimatesStrip from '../components/EstimatesStrip';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import APISERVICES from '../apiService';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import CustomToast from '../components/Toast';
import Header from '../components/Header';
import Divider from '../components/Divider';
import DividerSmall from '../components/DividerSmall';
import ButtonBlue from '../components/ButtonBlue';
import NotFound from '../components/NotFound';
import { Colors } from '../constants/styles';

const JobDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [estimateDetail, setEstimateDetail] = useState(null);
  const id = route.params;
  const [team, setTeam] = useState([]);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const role = useSelector(state => state?.user?.role_permission?.label);

  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;

  const getJobDetails = () => {
    setLoading(true);
    APISERVICES.job
      .get(id)
      .then(res => {
        // console.log(res.data[0]);
        setTeam(res.data[0].team_members);
        setEstimateDetail(res.data);
        console.log(estimateDetail?.[0]?.status);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleComment = () => {
    if (comment == '') {
      CustomToast('info', 'Comment cannot be empty!');
    } else {
      setLoading(true);
      APISERVICES.comment
        .post({
          activity: 2,
          instance_id: id,
          comment: comment,
        })
        .then(res => {
          // console.log(res);
          setComment('');
          getComments();
        })
        .catch(err => {
          console.log(err);
          CustomToast('error', err.message);
        })
        .finally(() => setLoading(false));
    }
  };

  const getComments = () => {
    setLoading(true);
    APISERVICES.comment
      .get(`?instance_id=${id}&activity=${2}`)
      .then(res => {
        // console.log(res);
        setAllComments(res);
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', err.message);
      })
      .finally(() => setLoading(false));
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
      }}>
      <View style={{ width: '17%', marginLeft: 10 }}>
        <View
          style={{
            height: 45,
            width: 45,
            backgroundColor: '#EFF2FB',
            margin: 15,
            borderRadius: 10,
            padding: 7,
          }}>
          <Material name="comment-text-multiple" size={30} color="black" />
        </View>
      </View>
      <View style={{ width: '80%', padding: 10 }}>
        <Text style={{ fontSize: 15, color: 'black' }}>{item.comment}</Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 14,
            fontWeight: '500',
          }}>
          {item.first_name} {item.last_name} {'('}
          {item?.role}
          {')'}
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 14,
            fontWeight: '500',
          }}>
          {dayjs(item.created_at).format('ddd, MMM D, YYYY - h:mm A')}
        </Text>
      </View>
    </View>
  );

  useEffect(() => {
    getJobDetails();
    getComments();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {loading && (
        <View style={{ margin: 15, position: 'absolute', top: 350, left: 170 }}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}

      <Header title="Job Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ backgroundColor: '#EFF2FB' }}>
            <Text
              style={{
                color: '#344A97',
                fontSize: 17,
                fontWeight: '500',
                marginVertical: 10,
                marginLeft: 20,
              }}>
              Customer details
            </Text>
          </View>

          <View
            style={{
              width: '92%',
              marginLeft: 16,
              borderRadius: 5,
              borderColor: '#DCE2EC',
              borderWidth: 3,
              marginTop: 8,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%', padding: 15 }}>
                <Text style={{ color: '#717171', letterSpacing: 0.3 }}>
                  Customer Name
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: '500',
                    letterSpacing: 0.3,
                  }}>
                  {estimateDetail?.[0]?.customer?.first_name}{' '}
                  {estimateDetail?.[0]?.customer?.last_name}
                </Text>
              </View>

              <View style={{ width: '50%' }}>
                <Text
                  style={{
                    color: '#717171',
                    marginLeft: 20,
                    marginTop: 15,
                    letterSpacing: 0.3,
                  }}>
                  Company
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: '500',
                    marginLeft: 20,
                    letterSpacing: 0.3,
                  }}>
                  {estimateDetail?.[0]?.customer?.company_name}
                </Text>
              </View>
            </View>

            {/* {(role == 'Technician' || role == 'Chief Technician') && (
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
                  {estimateDetail?.[0]?.customer?.email}
                </Text>
              </View>
            )} */}

            {(role == 'Technician' || role == 'Chief Technician') && (
              <View
                style={{
                  width: '50%',
                  padding: 15,
                  paddingLeft: 15,
                  letterSpacing: 0.3,
                }}>
                <Text style={{ color: '#717171' }}>Phone No</Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: '500',
                    letterSpacing: 0.3,
                  }}>
                  {estimateDetail?.[0]?.customer?.phone}
                </Text>
              </View>
            )}

            {/* {(role == 'Technician' || role == 'Chief Technician') && (
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
                  {estimateDetail?.[0]?.customer?.street},
                  {estimateDetail?.[0]?.customer?.town},
                  {estimateDetail?.[0]?.customer?.area},
                  {estimateDetail?.[0]?.customer?.post_code}
                </Text>
              </View>
            )} */}
          </View>

          {/* <View style={{marginVertical: 20}}></View> */}
        </View>

        {(role == 'Technician' || role == 'Chief Technician') && (
          <View style={{ marginTop: 25 }}>
            {team?.length > 0 && (
              <View style={{ backgroundColor: '#EFF2FB' }}>
                <Text
                  style={{
                    color: '#344A97',
                    fontSize: 17,
                    fontWeight: '500',
                    marginVertical: 10,
                    marginLeft: 20,
                  }}>
                  Team
                </Text>
              </View>
            )}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                backgroundColor: 'white',
                padding: 10,
                flexDirection: 'row',
                marginRight: 20,
                paddingRight: 20,
              }}>
              {team?.map(item => (
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                    backgroundColor: '#EFF2FB',
                    padding: 10,
                    marginLeft: 15,
                    borderRadius: 7,
                  }}>
                  {item?.first_name} {item?.last_name}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}

        {/* <Divider/> */}

        <View
          style={{
            marginTop: 10,
            // borderBottomColor: '#D8E0E8',
            // borderBottomWidth: 2,
            backgroundColor: '',
            // marginHorizontal: 15,
          }}>
          <View style={{ backgroundColor: '#EFF2FB', marginTop: 20 }}>
            <Text
              style={{
                color: '#344A97',
                fontSize: 17,
                fontWeight: '500',
                marginVertical: 10,
                marginLeft: 20,
              }}>
              Vehicle details
            </Text>
          </View>
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
            {estimateDetail?.[0].estimateData?.registration}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5 }}>
          <View style={{ width: '50%', padding: 15 }}>
            <Text style={{ color: '#717171', letterSpacing: 0.3 }}> Make</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
                marginLeft: 5,
              }}>
              {estimateDetail?.[0]?.make?.make}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
              padding: 15,
              paddingLeft: 30,
              letterSpacing: 0.3,
            }}>
            <Text style={{ color: '#717171' }}>Model</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                letterSpacing: 0.3,
              }}>
              {estimateDetail?.[0]?.model?.model}
            </Text>
          </View>
        </View>

        {(role == 'Chief Technician' || role == 'Technician') && (
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ width: '50%', paddingLeft: 15 }}>
              <Text
                style={{ color: '#717171', letterSpacing: 0.3, marginLeft: 8 }}>
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
                {estimateDetail?.[0]?.customer?.insurance_company}
              </Text>
            </View>
            <View style={{ width: '50%', paddingLeft: 30, letterSpacing: 0.3 }}>
              <Text style={{ color: '#717171' }}>Policy Number</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  letterSpacing: 0.3,
                }}>
                {estimateDetail?.[0]?.customer?.policy_number}
              </Text>
            </View>
          </View>
        )}

        {estimateDetail?.[0]?.estimateData?.paint_code && (
          <View
            style={{
              paddingLeft: 23,
              letterSpacing: 0.3,
              marginTop: 20,
              // backgroundColor: Colors.bestColor,
            }}>
            <Text style={{ color: '#717171' }}>Paint Code</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '800',
                letterSpacing: 0.3,
                marginLeft: 3,
              }}>
              {estimateDetail?.[0]?.estimateData?.paint_code.toUpperCase()}
            </Text>
          </View>
        )}

        {estimateDetail?.[0]?.estimateData?.description && (
          <View>
            <Text style={{ color: '#717171', marginLeft: 25, marginTop: 15 }}>
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
                {estimateDetail?.[0]?.estimateData?.description}
              </Text>
            </View>
            {/* <Divider /> */}
          </View>
        )}

        {Array.isArray(estimateDetail?.[0]?.estimateData?.filesData) && (
          <View>
            <View style={{ backgroundColor: '#EFF2FB', marginTop: 20 }}>
              <Text
                style={{
                  color: '#344A97',
                  fontSize: 17,
                  fontWeight: '500',
                  marginVertical: 10,
                  marginLeft: 20,
                }}>
                Damage photos
              </Text>
            </View>
            <KeyboardAwareScrollView
              horizontal
              showsHorizontalScrollIndicator={false}>
              {estimateDetail?.[0]?.estimateData?.filesData.map(item => (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item.path);
                    navigation.navigate('ImageXL', { path: item.path });
                  }}
                  style={{ marginVertical: 20, marginLeft: 20 }}>
                  <Image
                    source={{ uri: item.path }}
                    style={{ height: 180, width: 180, borderRadius: 20 }}
                  />
                </TouchableOpacity>
              ))}
            </KeyboardAwareScrollView>
          </View>
        )}

        {(role == 'Technician' || role == 'Chief Technician') && (
          <View>
            <View style={{ backgroundColor: '#EFF2FB', marginTop: 20 }}>
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

            {estimateDetail?.[0]?.services?.map(item => (
              <View>
                <View style={{ padding: 20 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>
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
                    <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                      <Text style={{ color: 'gray', fontSize: 16, marginTop: 1 }}>
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

                    <View style={{ flexDirection: 'row', marginLeft: '17%' }}>
                      <Text style={{ color: 'gray', fontSize: 16, marginTop: 1 }}>
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

                    <View style={{ flexDirection: 'row', marginLeft: '17%' }}>
                      <Text style={{ color: 'gray', fontSize: 16, marginTop: 1 }}>
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

                  <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                    <Text style={{ color: '#363636', fontSize: 16 }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: '500',
                        }}>
                        Description:
                      </Text>
                      {item?.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {(role == 'Technician' || role == 'Chief Technician') && (
          <View style={{ backgroundColor: '#EFF2FB', paddingBottom: 15 }}>
            <Divider />
            <View style={{ backgroundColor: 'white', margin: 20, padding: 20 }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'black', fontSize: 16 }}>Discount</Text>
                <Text style={{ color: 'black', marginRight: 10, fontSize: 16 }}>
                  £{estimateDetail?.[0]?.estimateData?.net_discount}
                </Text>
              </View>
              {/* <DividerSmall /> */}
              {/* <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black', fontSize: 16}}>Net Total:</Text>
                <Text style={{color: 'black', fontSize: 16, marginRight: 10}}>
                  £{estimateDetail?.[0]?.estimateData?.net_total}
                </Text>
              </View> */}

              <DividerSmall />

              {/* <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black', fontSize: 16}}>VAT</Text>
                <Text style={{color: 'black', marginRight: 10, fontSize: 16}}>
                  £{estimateDetail?.[0]?.estimateData?.net_vat}
                </Text>
              </View> */}

              {/* <DividerSmall /> */}
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                  £{estimateDetail?.[0]?.estimateData?.net_total}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View>
          <View style={{ backgroundColor: '#EFF2FB', marginTop: 20 }}>
            <Text
              style={{
                color: '#344A97',
                fontSize: 17,
                fontWeight: '500',
                marginVertical: 10,
                marginLeft: 20,
              }}>
              Comments
            </Text>
          </View>

          {/* {console.log(allComments.length)} */}

          {allComments.length == 0 ? (
            <View style={{ height: 200, marginTop: 100 }}>
              <NotFound data="Comments" />
            </View>
          ) : (
            <FlatList
              style={{ height: 300 }}
              data={allComments}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          )}

          <View style={{ margin: 15, flexDirection: 'row' }}>
            <View style={{ width: '65%' }}>
              <TextInput placeholderTextColor="#A6AFC8"
                style={{ backgroundColor: '#F9F9F9', height: 52 }}
                placeholder=" Write Comments"
                value={comment}
                onChangeText={txt => setComment(txt)}
              />
            </View>
            <View style={{ width: '32%', marginLeft: '2%' }}>
              <TouchableOpacity
                onPress={handleComment}
                style={{
                  backgroundColor: '#344A97',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 45,
                  marginTop: 2,
                  flexDirection: 'row',
                }}>
                <Text style={{ fontWeight: '500', color: 'white', fontSize: 15 }}>
                  Add Comment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {permissions?.job?.Add && estimateDetail?.[0]?.status != 3 && (
          <ButtonBlue
            textComponent="Update Job"
            handleOnPress={() => {
              navigation.navigate('UpdateJob', estimateDetail);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetail;

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
