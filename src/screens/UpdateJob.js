import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
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
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import FullEstimate from './FullEstimate';
import CustomDrawer from '../components/CustomDrawer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomToast from '../components/Toast';
import ButtonBlue from '../components/ButtonBlue';
import APISERVICES from '../apiService';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';

const UpdateJob = () => {
  const route = useRoute();
  const data = route.params[0];

  console.log(data, 'DATA');

  const [imageArray, setImageArray] = useState(
    data?.estimateData?.filesData ? data?.estimateData?.filesData : [],
  );
  const [pickedImage, setPickedImage] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [make, setMake] = useState('');
  const [makeId, setMakeId] = useState(data?.make?.id);
  const [referenceNo, setReferenceNo] = useState(
    data?.estimateData.ref_no ? data?.estimateData.ref_no : '',
  );
  const [model, setModel] = useState('');
  const [modelId, setModelId] = useState(data?.model?.id);
  const [customer, setCustomer] = useState(
    data?.customer
      ? data?.customer?.first_name + ' ' + data?.customer?.last_name
      : '',
  );
  const [customerId, setCustomerId] = useState(data?.customer?.id);
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState(
    data?.estimateData?.description ? data?.estimateData?.description : '',
  );
  console.log(data, 'fdat');
  ///////////////////////////////Added images to imgearray ///////////////////////////////////////////////

  const images = data?.Files;
  //   console.log(images);
  //   console.log(imageArray);

  const pushImages = () => {
    data?.Files?.map(item => {
      setImageArray(prevArray => [...prevArray, item]);
    });
  };

  const handleNext = () => {
    if (customer) {
      if (imageArray?.length > 0) {
        uploadPhoto();
      } else {
        navigation.navigate('UpdateFullJob', { services, ApiData, data });
      }
    } else {
      CustomToast('info', 'Please select customerr!');
    }
  };

  ////////////////////////////LAUNCH CAMERA ///////////////////////////////////////////////////////

  const openCamera = async () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true, // Set to true if you want to enable cropping
      useFrontCamera: true, // Set to true if you want to use the front camera
    })
      .then(image => {
        const source = { uri: image.path };
        console.log(image, 'Camera');
        const obj = {
          uri: image.path,
          name: image?.path.split('/').pop(),
          type: image.mime,
        };
        console.log(obj, 'lll');
        setImageArray(prevArray => [...prevArray, obj]);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const formik = useFormik({
    initialValues: {
      registration: '',
      makeF: '',
      modelF: '',
      paint_code: '',
    },
    validationSchema: validationSchema,

    onSubmit: handleNext,
  });

  // console.log(formik?.values)
  console.log(formik.errors);

  useEffect(() => {
    formik.setFieldValue('makeF', make);
    formik.setFieldValue('modelF', model);
  }, []);

  const selectMake = text => {
    setMake(text);
  };

  const selectMakeId = id => {
    setMakeId(id);
  };

  const selectModel = text => {
    setModel(text);
  };
  const selectModelId = id => {
    setModelId(id);
  };

  const handleModel = () => {
    if (formik.values.makeF == '') {
      CustomToast('info', 'Please select make first!');
    } else {
      navigation.navigate('SelectModel', {
        selectModel: selectModel,
        // formik:formik,
        makeId: makeId,
        selectModelId: selectModelId,
      });
    }
  };

  const getCameraPermission = async () => {
    try {
      let permissionResult;

      if (Platform.OS === 'ios') {
        permissionResult = await request(PERMISSIONS.IOS.CAMERA);
      } else if (Platform.OS === 'android') {
        permissionResult = await request(PERMISSIONS.ANDROID.CAMERA);
      }

      switch (permissionResult) {
        case RESULTS.UNAVAILABLE:
          CustomToast('info', 'This feature is not available on this device.');
          return false;
        case RESULTS.DENIED:
          CustomToast(
            'info',
            'The permission has been denied but is requestable.',
          );
          return false;
        case RESULTS.LIMITED:
          CustomToast(
            'info',
            'The permission is limited: some actions are possible.',
          );
          return true;
        case RESULTS.GRANTED:
          CustomToast('info', 'The permission is granted.');
          return true;
        case RESULTS.BLOCKED:
          CustomToast(
            'info',
            'The permission is denied and not requestable anymore.',
          );
          return false;
        default:
          return false;
      }
    } catch (error) {
      console.warn('Permission request error:', error);
      return false;
    }
  };

  const getStoragePermission = async () => {
    try {
      let permissionResult;

      if (Platform.OS === 'ios') {
        permissionResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY); // Requesting access to the photo library for iOS
      } else if (Platform.OS === 'android') {
        permissionResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ); // Requesting write access to external storage for Android
      }

      switch (permissionResult) {
        case RESULTS.UNAVAILABLE:
          CustomToast('info', 'This feature is not available on this device.');
          return false;
        case RESULTS.DENIED:
          CustomToast(
            'info',
            'The permission has been denied but is requestable.',
          );
          return false;
        case RESULTS.LIMITED:
          CustomToast(
            'info',
            'The permission is limited: some actions are possible.',
          );
          return true;
        case RESULTS.GRANTED:
          CustomToast('info', 'The permission is granted.');
          return true;
        case RESULTS.BLOCKED:
          CustomToast(
            'info',
            'The permission is denied and not requestable anymore.',
          );
          return false;
        default:
          return false;
      }
    } catch (error) {
      console.warn('Permission request error:', error);
      return false;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  VALIDATIONS
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const validationSchema = yup.object().shape({
    registration: yup.string().required('Registration  is required'),
    makeF: yup.string().required('Make is required'),
    modelF: yup.string().required('Model is required'),
    paint_code: yup.string().required('Paint code is required'),
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FILE UPLOAD FUNCTIONS
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const selectImageFromGallery = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: false, // Set to true if you want to enable cropping
    })
      .then(image => {
        const uri = image.path;

        const imageObj = {
          uri: image.path,
          name: image?.path.split('/').pop(),
          type: image.mime,
        };
        setPickedImage(uri);
        setImageArray(prevArray => [...prevArray, imageObj]);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  //   console.log(imageArray);

  const deleteImage = index => {
    const newArray = [...imageArray];
    newArray.splice(index, 1); // Remove the element at the specified index
    setImageArray(newArray);
  };

  function convertFilesToFormData(files) {
    const formData = new FormData();
    files.forEach(file => {
      const uriParts = file?.uri?.split('.');
      const fileType = uriParts[uriParts?.length - 1];
      formData.append('file[]', {
        uri: file.uri,
        name: `image.${fileType}`,
        type: file.type,
      });
    });
    return formData;
  }

  const uploadPhoto = async () => {
    setLoading(true);
    try {
      const imagestoUpload = imageArray?.filter(item => item?.uri);
      const formData = convertFilesToFormData(imagestoUpload);
      formData.append('module', 'Estimate');
      let photo = [];
      if (imagestoUpload?.length) {
        const res = await APISERVICES.uploadPhoto.post(formData);
        console.log(res, 'RESULT');
        photo = res?.data;
      }
      const photos = [...imageArray?.filter(item => item?.path), ...photo];
      navigation.navigate('UpdateFullJob', {
        services,
        ApiData,
        photos,
        data,
      });
    } catch (err) {
      console.log(err, 'RESULT');
    } finally {
      setLoading(false);
    }
    j;
  };

  useEffect(() => {
    formik.setValues({ ...formik.values, makeF: make });
  }, [make]);

  useEffect(() => {
    formik.setValues({ ...formik.values, modelF: model });
  }, [model]);

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...formik.values,
        registration: data?.estimateData?.registration,
        makeF: data?.make?.make,
        modelF: data?.model?.model,
        paint_code: data?.estimateData?.paint_code,
      });
    }
  }, [data]);

  const ApiData = {
    user_id: customerId,
    registration: formik?.values?.registration,
    ref_no: referenceNo,
    make_id: makeId,
    model_id: modelId,
    description: description,
    paint_code: formik?.values?.paint_code,
    draft: 0,
  };

  useEffect(() => {
    console.log(makeId);
  }, [make]);

  // useEffect(() => {
  //   pushImages();
  // }, [data]);

  const getCameraStoragePermission = async () => {
    await getStoragePermission();
    await getCameraPermission();
  };

  useEffect(() => {
    getCameraStoragePermission();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
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
          Update Job
        </Text>
      </View>

      <KeyboardAwareScrollView>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            Customer
          </Text>
        </View>

        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('SelectCustomer', {
          //     selectCustomer: selectCustomer,
          //     formik: formik,
          //     selectServices: selectServices,
          //     selectCustomerId: selectCustomerId,
          //   })
          // }
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={customer}
            // onChangeText={formik.handleChange('customerF')}
            // onBlur={formik.handleBlur('customerF')}
            style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

            placeholder="Select name.."
            editable={false}
          />
          <View style={{ margin: 10 }}>
            <Icon2 name="chevron-down" size={20} color="black" />
          </View>
        </TouchableOpacity>
        {formik.touched.customerF && formik.errors.customerF && (
          <Text
            style={{
              color: 'red',
              marginLeft: 25,
              fontSize: 13,
              marginBottom: 10,
              marginTop: -10,
            }}>
            {formik.errors.customerF}
          </Text>
        )}
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            Vehicle
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            backgroundColor: '#FFF8C8',
            marginBottom: 10,
          }}>
          <TextInput
            value={formik.values.registration}
            onChangeText={formik.handleChange('registration')}
            onBlur={formik.handleBlur('registration')}
            style={{ marginLeft: 15, color: 'black', width: '90%', height: 52 }}
            placeholderTextColor="#D2B62C"
            placeholder="Vehicle Registration Number "
            editable={true}
          />
        </View>
        {formik.touched.registration && formik.errors.registration && (
          <Text
            style={{
              color: 'red',
              marginLeft: 25,
              fontSize: 13,
              marginBottom: 10,
              marginTop: -10,
            }}>
            {formik.errors.registration}
          </Text>
        )}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextInput
            value={referenceNo}
            onChangeText={text => {
              setReferenceNo(text);
            }}
            style={{ marginLeft: 15, color: 'black', width: '90%', height: 52 }}
            placeholderTextColor="#A6AFC8"
            placeholder="Reference  Number"
            editable={true}
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SelectMakeScreen', {
              selectMake: selectMake,
              selectMakeId: selectMakeId,
            })
          }
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={formik.values.makeF}
            //    onChangeText={handleChange('make')}
            onBlur={formik.handleBlur('makeF')}
            style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

            placeholder="  Select Make"
            editable={false}
          />

          <View style={{ margin: 10 }}>
            <Icon2 name="chevron-down" size={20} color="black" />
          </View>
        </TouchableOpacity>
        {formik.touched.makeF && formik.errors.makeF && (
          <Text
            style={{
              color: 'red',
              marginLeft: 25,
              fontSize: 13,
              marginBottom: 10,
              marginTop: -10,
            }}>
            {formik.errors.makeF}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleModel}
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={formik.values.modelF}
            //onChangeText={handleChange('model')}
            onBlur={formik.handleBlur('model')}
            style={{ marginLeft: 5, color: 'black', fontSize: 15, height: 52 }}

            placeholder="  Select Model"
            editable={false}
          />
          <View style={{ margin: 10 }}>
            <Icon2 name="chevron-down" size={20} color="black" />
          </View>
        </TouchableOpacity>
        {formik.touched.modelF && formik.errors.modelF && (
          <Text
            style={{
              color: 'red',
              marginLeft: 25,
              fontSize: 13,
              marginBottom: 10,
              marginTop: -10,
            }}>
            {formik.errors.modelF}
          </Text>
        )}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#D8E0E8',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={formik.values.paint_code}
            onChangeText={formik.handleChange('paint_code')}
            onBlur={formik.handleBlur('registration')}
            style={{ marginLeft: 15, color: 'black', width: '90%', height: 52 }}

            placeholder="Paint Code"
            editable={true}
          />
        </View>
        {formik.touched.paint_code && formik.errors.paint_code && (
          <Text
            style={{
              color: 'red',
              marginLeft: 25,
              fontSize: 13,
              marginBottom: 10,
              marginTop: -10,
            }}>
            {formik.errors.paint_code}
          </Text>
        )}

        <View style={{ backgroundColor: '#EFF2FB' }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}>
            Damage Photos
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ marginBottom: 20 }}>
            {imageArray?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ImageXL', { path: item.path });
                }}
                style={{ marginLeft: 10 }}
                key={index}>
                <Image
                  source={{ uri: item.path ? item.path : item?.uri }}
                  style={styles.image}
                />
                <TouchableOpacity
                  onPress={() => deleteImage(index)}
                  style={{
                    position: 'absolute',
                    marginLeft: '80%',
                    marginTop: '20%',
                  }}>
                  <Icon2 name="circle-with-cross" size={20} color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity onPress={openCamera} style={{}}>
              <Icon3 name="camera" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={selectImageFromGallery}
              style={{ marginLeft: 30 }}>
              <Icon3 name="folder-images" size={50} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: '#EFF2F9',
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 20,
          }}>
          <TextInput placeholderTextColor="#A6AFC8"
            value={description}
            onChangeText={text => setDescription(text)}
            style={{ marginLeft: 5, width: '90%', color: 'black', height: 100 }}

            placeholder="Damage Description"
            multiline={true}
          />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: '#EFF2FB',
            height: 130,
            justifyContent: 'center',
          }}>
          <ButtonBlue
            textComponent="Next"
            handleOnPress={formik.handleSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
      {loading && (
        <View style={{ margin: 15, position: 'absolute', top: 350, left: 170 }}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UpdateJob;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3D75E1',
    marginHorizontal: 30,
    marginTop: 50,
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  validButton: {
    backgroundColor: '#3D75E1', // Change color for valid state
  },
  invalidButton: {
    backgroundColor: '#9ac5ff', // Change color for invalid state
  },
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 10,
    marginTop: 20,
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  documentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  documentTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  documentPreview: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
});
