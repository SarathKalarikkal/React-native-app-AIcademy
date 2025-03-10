import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FlipCard from "react-native-flip-card";
import * as Progress from 'react-native-progress';


export default function FlashCards() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  const flashCards = course?.flashcards;

  const width = Dimensions.get("screen").width;

  const router = useRouter()

  const onScroll =(e)=>{
    const index = Math.round(e?.nativeEvent?.contentOffset.x/width)
    console.log(index)
    setCurrentPage(index)
  }

  const progressBar =(currentPage)=>{
    const perc = (currentPage / flashCards?.length)
    return perc
    
  }

  return (
    <View>
      <Image
        source={require("./../../assets/images/wave.png") }
        style={{
          height: 800,
          width: "100%",
          backgroundColor:Colors.DARK_BG
        }}
      />
      <View
        style={{
          position: "absolute",
          padding: 25,
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <Pressable>
            <Ionicons name="arrow-back" size={20} color="white" onPress={()=> router.back()}/>
          </Pressable>
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: "outfit-bold",
            }}
          >
            {currentPage + 1} of {flashCards?.length}
          </Text>
        </View>
        <View style={{
                marginTop:10
            }}>
            <Progress.Bar progress={progressBar(currentPage)} width={Dimensions.get('window').width * 0.85} color={Colors.WHITE} height={10}/>
            </View>
        <FlatList
          data={flashCards}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                height: 400,
                width: width * 0.9,
                marginTop:40
              }}
            >
              <FlipCard style={[styles.flipCard,{backgroundColor:Colors.SECONDARY}]}>
                {/* Face Side */}
                <View style={[styles.frontCard]}>
                  <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:20,
                    color:Colors.WHITE
                  }}>{item?.front}</Text>
                </View>
                {/* Back Side */}
                <View style={[styles.backCard,{backgroundColor:Colors.PRIMARY,}]}>
                  <Text style={{
                    width:Dimensions.get('screen').width * 0.78,
                    padding:20,
                    textAlign:'center',
                    fontFamily:'outfit',
                    fontSize:20,
                    color:'white'
                  }}>{item?.back}</Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    flipCard: {
       width:  Dimensions.get('screen').width * 0.78,
       height:400,
       display:'flex',
       alignItems:'center',
       justifyContent:'center',
       borderRadius:20,
      //  marginHorizontal : Dimensions.get('screen').width * 0.04
      // marginLeft:
    },
    frontCard :{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height: '100%',
      borderRadius:20,
      
    },
    backCard:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height: '100%',
      borderRadius:20
    }
});