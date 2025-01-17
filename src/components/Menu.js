import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon2 from 'react-native-vector-icons/Entypo';
import APISERVICES from '../apiService';
import CustomToast from './Toast';
import {useNavigation} from '@react-navigation/native';
import {styles} from './CustomDrawer';
import ButtonBlue from './ButtonBlue';
import {Dropdown} from 'react-native-element-dropdown';

const MenuContext = ({ options, id, getJobList, getEstimateList, setLoading }) => {
  const navigation = useNavigation();
  const [BillInvoice, setBillInvoice] = useState('');
  const [moveToCompleteDialogOpen, setMoveToCompleteDialogOpen] =
    useState(false);

  const handleMenuSelect = value => {
    if (value == 'Move to on site') {
      handleMoveToOnSite();
    } else if (value == 'Move to in progress') {
      handleMoveToProgress();
    } else if (value == 'Move to completed') {
      setMoveToCompleteDialogOpen(true);
    } else if (value == 'convert to job') {
      convertToJob();
    }
  };

  const convertToJob = () => {
    Alert.alert(
      'Confirm convert to job',
      'Are you sure you want to convert this estimate?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            APISERVICES.convertJob
              .post({
                status: '1',
                id: id,
              })
              .then(res => {
                getEstimateList();
                CustomToast('success', res.message);
              })
              .then(err => {
                console.log(err);
                CustomToast('error', res.message);
              })
              .finally(() => {
                setLoading(false);
              });
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const handleMoveToOnSite = () => {
    APISERVICES.job
      .put(id, {
        status_change: 1,
      })
      .then(res => {
        console.log(res);
        CustomToast('success', 'Job moved to on site!');
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', 'Something went wrong!');
      })
      .finally(() => getJobList());
  };

  const handleMoveToProgress = () => {
    console.log('move to progress kia');
  };

  const handleMoveToCompleted = () => {
    setMoveToCompleteDialogOpen(false);
    setLoading(true)
    APISERVICES.job
      .put(id, {
        status_change: 3,
      })
      .then(res => {
        console.log(res);
        CustomToast('success', 'Job Completed!');
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', 'Something went wrong!');
      })
      .finally(() => {
        setLoading(false)
        getJobList()
      })
  };

  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Menu onSelect={value => handleMenuSelect(value)}>
          <MenuTrigger>
            <View style={{width: 30, alignItems: 'center', padding: 5}}>
              <Icon2 name="dots-three-vertical" size={20} color="black" />
            </View>
          </MenuTrigger>

          <MenuOptions>
            {options?.map(item => (
              <MenuOption value={item}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '500',
                    paddingTop: 7,
                    marginLeft: 5,
                    paddingBottom: 6,
                    fontSize: 15,
                  }}>
                  {item}
                </Text>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
      </View>

      <Modal transparent visible={moveToCompleteDialogOpen}>
        <TouchableOpacity
          onPress={() => {
            setMoveToCompleteDialogOpen(false);
          }}
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // This adds a transparent black layer
          }}>
          <Pressable
            onPress={e => {
              e.stopPropagation();
            }}
            style={{
              backgroundColor: '#fff',
              elevation: 20,
              borderRadius: 7,
              padding: 10,
              width: '85%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: '700',
                color: 'black',
                marginTop: 5,
              }}>
              Change Job's Progress
            </Text>

            <Text
              style={{
                color: 'gray',
                fontSize: 15,
                marginTop: 7,
                fontWeight: '500',
              }}>
              Are you sure you want mark the job as completed?
            </Text>
            <Text style={{color: 'gray', fontSize: 15, fontWeight: '500'}}>
              Please select one of the following options
            </Text>
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 45,
              }}>
              <Dropdown
                style={{
                  width: '80%',
                  height: 50,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                }}
                data={[
                  {label: 'Bill', value: 'bill'},
                  {label: 'Invoice', value: 'invoice'},
                ]}
                labelField="label"
                valueField="value"
                placeholder="Select option"
                // value={BillInvoice}
                onChange={item => {
                  // setBillInvoice(item.value);
                  console.log(item.label, item.value);
                }}
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: 30}}>
              <View style={{width: '50%'}}>
                <ButtonBlue
                  textComponent="No"
                  handleOnPress={() => setMoveToCompleteDialogOpen(false)}
                />
              </View>

              <View style={{width: '50%'}}>
                <ButtonBlue
                  textComponent="Yes"
                  handleOnPress={handleMoveToCompleted}
                />
              </View>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default MenuContext;
