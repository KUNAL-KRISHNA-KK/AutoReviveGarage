import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineSlices} from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import APISERVICES from '../apiService';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import CustomToast from './Toast';
import {flingGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
import {ScrollView} from 'react-native-gesture-handler';
import {MenuView} from '@react-native-menu/menu';
import MenuContext from './Menu';

const EstimatesStrip = ({
  name,
  email,
  phone,
  already_convert,
  id,
  onSuccess,
  role,
  draft,
  status,
  getEstimateList,
}) => {
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const options =
    status == 'Approved' && already_convert == false ? ['convert to job'] : [];

  // console.log(already_convert);

  const setBg = () => {
    if (status == 'Approved') {
      return '#E2F6F0';
    } else if (status == 'Draft') {
      return '#FEF2E1';
    } else if (status == 'Pending') {
      return '#E3EDFF';
    } else if (status == 'Review') {
      return '#DCEFF7';
    }
  };

  const setColor = () => {
    if (status == 'Approved') {
      return '#0D825B';
    } else if (status == 'Draft') {
      return '#BA5115';
    } else if (status == 'Pending') {
      return '#3D75E1';
    } else if (status == 'Review') {
      return '#0E7090';
    }
  };

  const handleRemove = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this estimate?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
            setMenu(false);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setLoading(true);
            setMenu(!menu);
            APISERVICES.delete
              .delete(id)
              .then(res => {
                // console.log(res);
              })
              .then(err => {
                console.log(err);
              })
              .finally(() => {
                setLoading(false);
                if (onSuccess) onSuccess();
              });
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EstimateDetail', id)}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#E3EDFF',
        marginHorizontal: 10,
        // paddingVertical:5
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 3,
        }}>
        <Text
          style={{
            marginTop: 5,
            marginLeft: 5,
            fontWeight: '500',
            fontSize: 16,
            color: 'black',
          }}>
          {name}
        </Text>
        <Text style={{marginRight: 40, color: '#333333'}}>{role}</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.7}}>
          <Text
            numberOfLines={1}
            style={{color: '#333333', marginLeft: 8, fontSize: 13}}>
            {email}
          </Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: setBg(),
              paddingVertical: 2,
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: setColor(),
                paddingVertical: 1.5,
                fontSize: 13,
                paddingHorizontal: 12,
                fontWeight: '700',
              }}>
              {status}
            </Text>
          </View>

          {status == 'Approved' && !already_convert ? (
            <MenuContext
              options={options}
              id={id}
              getEstimateList={getEstimateList}
            />
          ) : (
            <View style={{marginRight: 30}}></View>
          )}
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{color: '#333333', marginLeft: 8, marginBottom: 10}}>
            {phone}
          </Text>
        </View>

        {already_convert && (
          <View
            style={{
              backgroundColor: '#E3EDFF',
              paddingVertical: 2,
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginRight: '7%',
              marginTop: 2,
              marginBottom: '2%',
            }}>
            <Text
              style={{
                color: '#3D75E1',
                paddingVertical: 1.5,
                fontSize: 13,
                paddingHorizontal: 12,
                fontWeight: '700',
              }}>
              Converted
            </Text>
          </View>
        )}
      </View>

      {/* {
        menu && (
          <View style={{position:'absolute',top:'10%',left:"60%",backgroundColor:"gray"}}>
            <MenuView
              title="Menu Title"
              onPressAction={({ nativeEvent }) => {
                console.warn(JSON.stringify(nativeEvent));
              }}
              actions={[
                {
                  id: 'add',
                  titleColor: '#2367A2',
                  image: Platform.select({
                    ios: 'plus',
                    android: 'ic_menu_add',
                  }),
                  imageColor: '#2367A2',
                  subactions: [
                    {
                      id: 'nested1',
                      title: 'Nested action',
                      titleColor: 'rgba(250,180,100,0.5)',
                      subtitle: 'State is mixed',
                      image: Platform.select({
                        ios: 'heart.fill',
                        android: 'ic_menu_today',
                      }),
                      imageColor: 'rgba(100,200,250,0.3)',
                      state: 'mixed',
                    },
                    {
                      id: 'nestedDestructive',
                      title: 'Destructive Action',
                      attributes: {
                        destructive: true,
                      },
                      image: Platform.select({
                        ios: 'trash',
                        android: 'ic_menu_delete',
                      }),
                    },
                  ],
                },
                {
                  id: 'share',
                  title: 'Share Action',
                  titleColor: '#46F289',
                  subtitle: 'Share action on SNS',
                  image: Platform.select({
                    ios: 'square.and.arrow.up',
                    android: 'ic_menu_share',
                  }),
                  imageColor: '#46F289',
                  state: 'on',
                },
                {
                  id: 'destructive',
                  title: 'Destructive Action',
                  attributes: {
                    destructive: true,
                  },
                  image: Platform.select({
                    ios: 'trash',
                    android: 'ic_menu_delete',
                  }),
                },
              ]}
              shouldOpenOnLongPress={false}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Test</Text>
              </View>
            </MenuView>
          </View>
        )

      }  */}
    </TouchableOpacity>
  );
};

export default EstimatesStrip;

const styles = StyleSheet.create({});
