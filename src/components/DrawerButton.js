import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";

const DrawerButton = ({ ButtonText, handleOnPress }) => {
    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle = {
        backgroundColor: isPressed ? '#2357C6' : "#FFFFFF",
    };
    return (
        <TouchableOpacity
            className=""
            style={[styles.button, buttonStyle]}
            onPress={handleOnPress}
        >
            <Text style={styles.buttonText}>{ButtonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFFFFF",
        margin: 2,
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    buttonText: {
        color: "black",
        fontWeight: "500",
        fontSize: 17,
        margin: 3,
        marginLeft: 10,
    },
});

export default DrawerButton;
