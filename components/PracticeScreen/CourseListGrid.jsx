import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constant/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';


export default function CourseListGrid({courseList, option}) {

  const router = useRouter()
  

  const onPress=(course)=>{
   
      router.push({
        pathname : option.path,
        params : {
          courseParams :JSON.stringify(course) 
        }
      })
    
  }
  
  return (
    <View style={{
      backgroundColor:Colors.DARK_BG,
    }}>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{
          padding : 20,
          backgroundColor:Colors.DARK_BG,
          height: '100%',
        }}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=>onPress(item)} key={index} style={{
            flex: 1,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            padding:10,
            backgroundColor:Colors.SECONDARY,
            margin:7,
            borderRadius:15,
            elevation:1
          }}>
            <AntDesign name="checkcircle" size={18} color={Colors.WHITE} style={{
              position:'absolute',
              right:10,
              top:10
            }} />
              <Image source={option?.icon} style={{
                width:"100%",
                height:70,
                objectFit:'contain'
              }}/>
              <Text style={{
                fontFamily:'outfit',
                textAlign:'center',
                marginTop:7,
                fontSize:12,
                color:Colors.WHITE
              }}>
                {item.courseTitle}
              </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}