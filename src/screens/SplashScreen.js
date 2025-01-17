import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';



export default function SplashScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const getDataAsync = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            console.log("KK", user)
            if (user) {
                const data = user ? JSON.parse(user) : user;
                console.log("token", data.token);
                dispatch(setUser(data))
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                })
            }
        } catch (e) {

        }
    };
    const getSetNavigate = async () => {
        await getDataAsync();
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getSetNavigate();
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);



    return (
        <View style={{ backgroundColor: "white", height: "100%", flex: 1, justifyContent: 'center', alignItems: "center" }}>
            <Image
                style={{ height: 180, width: 360 }}
                source={require('../assets/Images/logo.png')}
            />

        </View>
    )
}

const styles = StyleSheet.create({})