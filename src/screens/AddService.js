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

import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ButtonBlue from '../components/ButtonBlue';

const AddService = () => {
    const navigation = useNavigation();
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
                    Add Service
                </Text>
            </View>

            <View
                style={{
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    margin: 20,
                    borderWidth: 5,

                    borderColor: "#EFF2FB"
                }}>
                <View style={{ marginLeft: 15, marginTop: 20 }}>
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: "500" }}>Services</Text>
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
                    <Text style={{ color: "#3D75E1" }}>Rate</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextInput placeholderTextColor="#A6AFC8"
                        placeholder="Enter Quantity"

                        keyboardType='numeric'
                        style={{ color: 'black', width: '47%', marginLeft: 10, fontSize: 15, height: 52 }}
                    />

                    <TextInput placeholderTextColor="#A6AFC8"
                        placeholder="Rate"
                        keyboardType='numeric'

                        style={{ color: 'black', width: '50%', marginLeft: 10, fontSize: 15, height: 52 }}
                    />

                </View>
                <View
                    style={{
                        borderBottomColor: '#E3E5EC',
                        borderBottomWidth: 1,
                        marginHorizontal: 10,
                        marginBottom: 15
                    }}></View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{ width: "50%", backgroundColor: "#3D75E1", borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ margin: 10, color: "white", fontSize: 16 }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
};

export default AddService;

const styles = StyleSheet.create({});
