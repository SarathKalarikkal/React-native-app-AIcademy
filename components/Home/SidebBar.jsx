import React, { useRef, useEffect, useContext } from "react";
import { View, Text, Animated, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constant/Colors";


export default function Sidebar({ showSettings, setShowSettings }) {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen

  

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showSettings ? 0 : -300, // Slide down when true, up when false
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showSettings]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "20%",
        backgroundColor:  Colors.CARD_BG ,
        padding: 15,
        transform: [{ translateY: slideAnim }], 
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "outfit-bold",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Settings
        </Text>
        <Pressable onPress={() => setShowSettings(false)}>
          <MaterialIcons name="close" size={24} color={Colors.WHITE} />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
          <Pressable style={[styles.iconContainer,{borderColor: Colors.ACCENT}]}  >
            <MaterialIcons name='dark-mode' size={24} color={Colors.WHITE} />
            <Text style={[styles.iconText,{color: Colors.WHITE}]}>Mode</Text>
          </Pressable>
          <Pressable style={[styles.iconContainer,{borderColor: Colors.ACCENT}]} >
            <MaterialIcons name='notifications' size={24} color={Colors.WHITE} />
            <Text style={[styles.iconText,{color: Colors.WHITE}]}>Alerts</Text>
          </Pressable>
          <Pressable style={[styles.iconContainer,{borderColor: Colors.ACCENT}]}  >
            <MaterialIcons name='settings' size={24} color={Colors.WHITE} />
            <Text style={[styles.iconText,{color: Colors.WHITE}]}>More</Text>
          </Pressable>
      </View>
    </Animated.View>
  );
}


const styles = {
  iconContainer: {
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: 60,
    height: 60,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  iconText: {
    fontFamily: "outfit",
    fontSize: 12,
    marginTop: 5,
  },
};
