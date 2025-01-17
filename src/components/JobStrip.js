import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const JobStrip = ({ name, setJob }) => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    return (
        <TouchableOpacity
            onPress={() => {
                if (setJob) {
                    setJob(name);
                }
                setIsChecked(!isChecked);
                navigation.goBack();
            }}>
            <View
                style={{
                    marginTop: 10,
                    height: 50,
                    marginHorizontal: 25,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#DBE5F2',
                }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: '500',
                        marginLeft: 5,
                    }}>
                    {name}
                </Text>

                <View style={{ marginTop: 5, marginLeft: 5, height: 20 }}>
                    <Text style={{ fontSize: 14, color: "#7E8695" }}>648 Willow Startvenue, mitchellfurt, WA 85732-6793</Text>
                </View>


            </View>
        </TouchableOpacity>
    );
};

export default JobStrip;

const styles = StyleSheet.create({
    checkboxContainer: {
        marginRight: 10, // Adjust as needed
    },
    checkbox: {
        width: 17,
        height: 17,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#778899',
    },
    checked: {
        backgroundColor: '#2357C6', // Color when checked
        borderWidth: 1,
        borderColor: '#2357C6',
    },
});
