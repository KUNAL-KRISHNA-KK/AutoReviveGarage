import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonBlue from '../components/ButtonBlue';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const ImageXL = () => {
  const route = useRoute();
  const {path} = route.params;
  const navigation = useNavigation();
  console.log(path, 'PATH');
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View style={{height: '90%'}}>
        <Image
          source={{uri: path}}
          style={{flex: 1, alignSelf: 'center', aspectRatio: 1}}
          resizeMode="contain"
        />
      </View>
      <View style={{height: '10%'}}>
        <ButtonBlue
          textComponent="Close"
          handleOnPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImageXL;

const styles = StyleSheet.create({});
