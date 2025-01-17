import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import APISERVICES from '../apiService';
import CustomToast from '../components/Toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonBlue from '../components/ButtonBlue';
import { ComposedGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
import { useFormik } from 'formik';
import * as yup from 'yup';

const CreateCustomer = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [town, setTown] = useState('');
  const [postCode, setPostCode] = useState('');
  const [email, setEmail] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');

  const validationSchema = yup.object().shape({
    company_type: yup.string().required('Company type is required'),
    firstName: yup.string().required('First name is required'),
    // lastName: yup.string().required('Last name is required'),
    mobile: yup
      .string()
      .required('Mobile number is required')
      .matches(/^\d{11}$/, 'Mobile number must be exactly 11 digits'),
    // companyName: yup.string().required('Company name is required'),
    street: yup.string().required('Street is required'),
    // area: yup.string().required('Area is required'),
    town: yup.string().required('Town is required'),
    postCode: yup
      .string()
      .typeError('Must be a string')
      .required('Field is required')
      .matches(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, 'Invalid UK postal code'),
    email: yup.string().email('Invalid email').required('Email is required'),
    workPhone: yup
      .string()
      .required('Work phone is required')
      .matches(/^\d{11}$/, 'Mobile number must be exactly 11 digits'),
    insuranceCompany: yup.string('Must be String').when('company_type', {
      is: value => value !== 'Trade Contact',
      then: schema => schema.required(),
      otherwise: schema => schema.notRequired(),
    }),
    policyNumber: yup.string().when('company_type', {
      is: value => value !== 'Trade Contact',
      then: schema => schema.required(),
      otherwise: schema => schema.notRequired(),
    }),
    company_type: yup.string().required('Company type is required'),
    // tradeRate: yup.number('Must be number').when('company_type', {
    //   is: value => value !== 'Private/Insurance',
    //   then: schema => schema.required('Field is required'),
    //   otherwise: schema => schema.notRequired(),
    // }),
  });

  const formik = useFormik({
    initialValues: {
      company_type: '',
      firstName: '',
      lastName: '',
      mobile: '',
      companyName: '',
      street: '',
      area: '',
      town: '',
      postCode: '',
      email: '',
      workPhone: '',
      insuranceCompany: '',
      policyNumber: '',
      tradeRate: '',
    },
    validationSchema: validationSchema,

    onSubmit: async values => {
      console.log(values);
      handleCreateCustomer();
    },
  });

  const getCompanyList = () => {
    setLoading(true);
    APISERVICES.companyType
      .get()
      .then(res => {
        console.log(res.data.company_type);
        setCompanyList(res.data.company_type);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const prepareSelectionData = () => {
    const selectionData = [];
    companyList?.map(item => {
      const stringID = item.id.toString();
      selectionData.push({
        key: stringID,
        value: item.name,
      });
    });

    return selectionData;
  };

  const setCompanyId = () => {
    if (formik.values.company_type == 'Private/Insurance') {
      return '1';
      console.log(1);
    } else if (formik.values.company_type == 'Trade Contact') {
      return '2';
      console.log(2);
    } else {
      return '';
      console.log(30);
    }
  };

  const handleCreateCustomer = () => {
    setLoading(true);
    const ApiData = {
      first_name: formik.values.firstName,
      last_name: formik.values.lastName,
      phone: formik.values.mobile,
      email: formik.values.email,
      company_name: formik.values.companyName,
      company_type: setCompanyId(),
      street: formik.values.street,
      area: formik.values.area,
      town: formik.values.town,
      post_code: formik.values.postCode,
      work_phone: formik.values.workPhone,
      insurance_company: formik.values.insuranceCompany,
      policy_number: formik.values.policyNumber,
      trade_rate: formik.values.tradeRate,
    };
    console.log(ApiData);

    APISERVICES.customer
      .post(ApiData)
      .then(res => {
        console.log(res);
        CustomToast('success', 'Customer Created!');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        CustomToast('error', err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCompanyList();
    prepareSelectionData();
  }, []);

  useEffect(() => {
    setCompanyId(); // Pass the new value for companyId
    formik.setFieldValue('policyNumber', ''); // Update policyNumber field value
    formik.setFieldValue('insuranceCompany', ''); // Update insuranceCompany field value
    formik.setFieldValue('tradeRate', ''); // Update tradeRate field value
  }, [formik?.values?.company_type]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
          Create Customer
        </Text>
      </View>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                // fontWeight: '500',
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Customer Type
            </Text>
          </View>
          {
            <View>
              <SelectList
                value={formik.values.company_type}
                placeholder="Select customer type.."
                search={false}
                name={'company_type'}
                setSelected={val => {
                  formik.handleChange('company_type')(val);
                  // console.log(values?.companyType)
                }}
                boxStyles={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#EFF2FB',
                  marginHorizontal: 20,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  marginVertical: 10,
                  borderWidth: 0,
                  paddingVertical: 15,
                }}
                defaultValue={1}
                inputStyles={{
                  // additional styles for the text of selection box
                  color: 'black',
                  fontSize: 15,
                  // fontWeight: "500"
                }}
                dropdownStyles={{
                  // additional styles for the dropdown scrollview
                  marginHorizontal: 20,
                  marginTop: -5,
                  borderWidth: 0,
                  backgroundColor: '#EFF2FB',
                  elevation: 7,
                }}
                dropdownItemStyles={
                  {
                    // additional styles for the dropdown single list item
                  }
                }
                dropdownTextStyles={{
                  // additional styles for the dropdown list items text
                  color: 'black',
                  fontSize: 15,
                }}
                data={prepareSelectionData()}
                save="value"
                arrowicon={
                  <Icon2 name="chevron-down" size={20} color="black" />
                }
              />
            </View>
          }
        </View>

        {formik.touched.company_type && formik.errors.company_type && (
          <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
            {formik.errors.company_type}
          </Text>
        )}

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: '49%' }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  marginLeft: 20,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                First Name
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#EFF2FB',
                marginHorizontal: 20,
                borderWidth: 0,
                borderRadius: 10,
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <TextInput placeholderTextColor="#A6AFC8"
                value={formik.values.firstName}
                onChangeText={formik.handleChange('firstName')}
                onBlur={formik.handleBlur('firstName')}
                style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

                placeholder="First name.."
              />
            </View>
            {formik.touched.firstName && formik.errors.firstName && (
              <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
                {formik.errors.firstName}
              </Text>
            )}
          </View>
          {console.log(formik.errors)}

          <View style={{ width: '49%' }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                Last Name
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#EFF2FB',
                // marginHorizontal: 20,
                marginRight: 15,
                borderWidth: 0,
                borderRadius: 10,
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <TextInput placeholderTextColor="#A6AFC8"
                value={formik.values.lastName}
                onChangeText={formik.handleChange('lastName')}
                onBlur={formik.handleBlur('lastName')}
                style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

                placeholder="Last name.."
              />
            </View>
            {/* {formik.touched.lastName && formik.errors.lastName && (
              <Text style={{color: 'red', marginLeft: 5, fontSize: 13}}>
                {formik.errors.lastName}
              </Text>
            )} */}
          </View>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Mobile No.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              // marginHorizontal: 20,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.mobile}
              onChangeText={formik.handleChange('mobile')}
              onBlur={formik.handleBlur('mobile')}
              keyboardType="numeric"
              maxLength={11}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="(+44)"
            />
          </View>
          {formik.touched.mobile && formik.errors.mobile && (
            <Text style={{ color: 'red', marginLeft: 10, fontSize: 13 }}>
              {formik.errors.mobile}
            </Text>
          )}
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Company Name
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              // marginHorizontal: 20,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.companyName}
              onChangeText={formik.handleChange('companyName')}
              onBlur={formik.handleBlur('companyName')}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="Your company Name"
            />
          </View>
          {/* {formik.touched.companyName && formik.errors.companyName && (
            <Text style={{color: 'red', marginLeft: 10, fontSize: 13}}>
              {formik.errors.companyName}
            </Text>
          )} */}
        </View>

        <View style={{ backgroundColor: '#F0F0F0', padding: 13 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              marginTop: 20,
              fontWeight: '700',
              marginLeft: 20,
            }}>
            Address
          </Text>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
            // marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Street
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              // marginHorizontal: 20,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.street}
              onChangeText={formik.handleChange('street')}
              onBlur={formik.handleBlur('street')}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="Your Street Address"
            />
          </View>
          {formik.touched.street && formik.errors.street && (
            <Text style={{ color: 'red', fontSize: 13, marginLeft: 5 }}>
              {formik.errors.street}
            </Text>
          )}
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
            marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Area
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              // marginHorizontal: 20,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.area}
              onChangeText={formik.handleChange('area')}
              onBlur={formik.handleBlur('area')}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="Write Area"
            />
          </View>
          {/* {formik.touched.area && formik.errors.area && (
            <Text style={{color: 'red', marginLeft: 8, fontSize: 13}}>
              {formik.errors.area}
            </Text>
          )} */}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: '49%' }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  marginLeft: 20,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                Town
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#EFF2FB',
                marginHorizontal: 20,
                borderWidth: 0,
                borderRadius: 10,
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <TextInput placeholderTextColor="#A6AFC8"
                value={formik.values.town}
                onChangeText={formik.handleChange('town')}
                onBlur={formik.handleBlur('town')}
                style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

                placeholder="Town"
              />
            </View>
            {formik.touched.town && formik.errors.town && (
              <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
                {formik.errors.town}
              </Text>
            )}
          </View>

          <View style={{ width: '49%' }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                Post Code
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#EFF2FB',
                // marginHorizontal: 20,
                marginRight: 15,
                borderWidth: 0,
                borderRadius: 10,
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <TextInput placeholderTextColor="#A6AFC8"
                value={formik.values.postCode}
                onChangeText={formik.handleChange('postCode')}
                onBlur={formik.handleBlur('postCode')}
                style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}
                // keyboardType="numeric"
                maxLength={10}

                placeholder="Code"
              />
            </View>
            {formik.touched.postCode && formik.errors.postCode && (
              <Text style={{ color: 'red', marginLeft: 8, fontSize: 13 }}>
                {formik.errors.postCode}
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
            marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Email Address
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              // marginHorizontal: 20,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="Email Address"
            />
          </View>
          {formik.touched.email && formik.errors.email && (
            <Text style={{ color: 'red', marginLeft: 7, fontSize: 13 }}>
              {formik.errors.email}
            </Text>
          )}
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
            marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                marginTop: 20,
                marginBottom: 10,
              }}>
              Work Phone
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#EFF2FB',
              // marginHorizontal: 20,
              marginRight: 15,
              borderWidth: 0,
              borderRadius: 10,
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput placeholderTextColor="#A6AFC8"
              value={formik.values.workPhone}
              onChangeText={formik.handleChange('workPhone')}
              onBlur={formik.handleBlur('workPhone')}
              keyboardType="numeric"
              maxLength={11}
              style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

              placeholder="(+44)"
            />
          </View>
          {formik.touched.workPhone && formik.errors.workPhone && (
            <Text style={{ color: 'red', marginLeft: 8, fontSize: 13 }}>
              {formik.errors.workPhone}
            </Text>
          )}
        </View>

        {formik.values.company_type == 'Private/Insurance' ? (
          <View>
            <View
              style={{
                marginLeft: 20,
                marginRight: 10,
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 17,
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  Insurance Company
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#EFF2FB',
                  // marginHorizontal: 20,
                  marginRight: 15,
                  borderWidth: 0,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <TextInput placeholderTextColor="#A6AFC8"
                  value={formik.values.insuranceCompany}
                  onChangeText={formik.handleChange('insuranceCompany')}
                  onBlur={formik.handleBlur('insuranceCompany')}
                  // onBlur={handleBlur('insuranceCompany')}
                  style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

                  placeholder="Insurance"
                />
              </View>
            </View>

            {formik.touched.insuranceCompany &&
              formik.errors.insuranceCompany && (
                <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
                  {formik.errors.insuranceCompany}
                </Text>
              )}

            <View
              style={{
                marginLeft: 20,
                marginRight: 10,
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 17,
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  Policy Number
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#EFF2FB',
                  // marginHorizontal: 20,
                  marginRight: 15,
                  borderWidth: 0,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <TextInput placeholderTextColor="#A6AFC8"
                  value={formik.values.policyNumber}
                  onChangeText={formik.handleChange('policyNumber')}
                  onBlur={formik.handleBlur('policyNumber')}
                  // onBlur={handleBlur('policyNumber')}
                  keyboardType="numeric"
                  style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

                  placeholder="Policy Number"
                />
              </View>
            </View>

            {formik.touched.policyNumber && formik.errors.policyNumber && (
              <Text style={{ color: 'red', marginLeft: 25, fontSize: 13 }}>
                {formik.errors.policyNumber}
              </Text>
            )}
          </View>
        ) : (
          <View>
            <View
              style={{
                marginLeft: 20,
                marginRight: 10,
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 17,
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  Trade Rate
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#EFF2FB',
                  // marginHorizontal: 20,
                  marginRight: 15,
                  borderWidth: 0,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <TextInput placeholderTextColor="#A6AFC8"
                  value={formik.values.tradeRate}
                  onChangeText={formik.handleChange('tradeRate')}
                  onBlur={formik.handleBlur('tradeRate')}
                  keyboardType="numeric"
                  style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

                  placeholder="45"
                />
              </View>
            </View>
          </View>
        )}

        {/* {formik.touched.tradeRate && formik.errors.tradeRate && (
          <Text style={{color: 'red', marginLeft: 25, fontSize: 13}}>
            {formik.errors.tradeRate}
          </Text>
        )} */}

        <View style={{ marginBottom: 50 }}>
          <TouchableOpacity
            // disabled={validCustomer()}
            style={{
              backgroundColor: '#2357C6',
              height: 50,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}
            onPress={formik.handleSubmit}>
            <Text
              className="font-semibold text-white"
              style={{ fontWeight: '600', color: 'white' }}>
              Add customer
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateCustomer;

const styles = StyleSheet.create({});
