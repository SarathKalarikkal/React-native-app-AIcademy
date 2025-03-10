import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "../../context/UserDetailContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../../constant/Colors";


export default function Header({showSettings,setShowSettings}) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  return (
    <View style={{
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      // paddingHorizontal: 10,
    }}>
      <View>
        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          color: Colors.WHITE,
        }}>
          Hello, {userDetail?.name}
        </Text>
        <Text style={{
          fontFamily: "outfit",
          fontSize: 14,
          color: Colors.TEXT_DARK,
        }}>
          Let's get started!
        </Text>
      </View>

      {showSettings && 

      <TouchableOpacity>
        <AntDesign name="setting" size={30} color={Colors.WHITE} onPress={()=>setShowSettings(!showSettings)}/>
      </TouchableOpacity>
      } 
    </View>
  );
}
