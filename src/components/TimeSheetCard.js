import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

const TimeSheetCard = ({ name }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("JobDetail")}>
            <View style={{ backgroundColor: "white", marginHorizontal: 30, marginTop: 20 }}>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 13 }}>
                    <Text style={{ color: "black" }}>Monday Feb 8</Text>
                    <Text style={{ color: "#2357C6" }}>View details</Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 13, marginBottom: 13 }}>
                    <View>
                        <Text style={{ color: "black", fontSize: 19, fontWeight: "500" }}>{name}</Text>
                        <Text style={{ color: "black", fontSize: 13, marginTop: 2 }}>09:29 Am - 12:30 Pm</Text>

                    </View>

                    <View>
                        <Text style={{ color: "black", fontSize: 12, marginTop: 4 }}>Total time</Text>
                        <Text style={{ color: "black", marginLeft: 8, fontWeight: "800", fontSize: 13 }}>3h 29m</Text>

                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default TimeSheetCard

const styles = StyleSheet.create({})