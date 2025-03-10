import { View, Text,Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useRouter } from 'expo-router'
import { UserDetailContext } from '../../context/UserDetailContext';
import Colors from '../../constant/Colors';
import { ProfileMenu } from '../../constant/Option';
import Ionicons from '@expo/vector-icons/Ionicons';
import {auth} from './../../config/firebaseConfig';
import { signOut } from 'firebase/auth';


export default function Profile() {

  const router = useRouter()

  const { userDetail, setUserDetail,setCourseList  } = useContext(UserDetailContext);
  

const onMenuClick=(menu)=>{
  if(menu.name == 'Logout'){
    signOut(auth).then(()=>{
      setUserDetail(null)
      setCourseList([])
      router.push('/')
    }).catch((error)=>{
      console.log(error)
    })
  }else{
    router.push(menu.path)
  }
}

  return (
    <View style={{
      backgroundColor:Colors.SECONDARY,
      flex:1,
      padding:25
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        color:Colors.WHITE
      }}>Profile</Text>

     <View style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
     }}>
     <Image style={{
        width:120,
        height: 120,
      }} source={require('../../assets/images/icon.png')}/>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:18,
        color:Colors.WHITE,
        marginTop:5
      }}>{userDetail?.name}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:15,
        color:Colors.TEXT_LIGHT,
      }}>{userDetail?.email}</Text>
     </View>

    {
      ProfileMenu?.map((item,index)=>(
        <TouchableOpacity onPress={()=>onMenuClick(item)} key={index} style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          gap:20,
          padding:8,
          marginTop:8,
          backgroundColor:Colors.CARD_BG,
          borderRadius:10,
          elevation:1,
        }}>
         <Ionicons name={item.icon} size={24} color={Colors.ACCENT} style={{
          padding:8,
          borderRadius:10,
          backgroundColor:Colors.SECONDARY
         }} />
        <Text style={{
          fontFamily:'outfit',
          fontSize:15,
          color:Colors.ACCENT
        }}>{item.name}</Text>
       </TouchableOpacity>
      ))
    }
    </View>
  )
}