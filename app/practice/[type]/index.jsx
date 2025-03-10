import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import { PraticeOption} from "./../../../constant/Option"
import { Image } from 'react-native'
import Colors from "../../../constant/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import {db} from "../../../config/firebaseConfig"
import { query, where, collection, orderBy, getDocs } from 'firebase/firestore'
import { UserDetailContext } from "./../../../context/UserDetailContext"
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid'


export default function PracticeTypeHome() {

  const [loading, setLoading] =useState(false)
  const [courseList, setCourseList] =useState([])

const {type} = useLocalSearchParams()
const {userDetail, setUserDetail} = useContext(UserDetailContext)


const option = PraticeOption?.find((item)=> item.name == type)



const router = useRouter()

useEffect(()=>{
  getCourseList()
},[])

const getCourseList =async()=>{
  setLoading(true)
setCourseList([]) 
  try {
    const q = query(collection(db,'Courses'),where('createdBy','==',userDetail?.email),orderBy('createdOn','desc'))

    const querySnapshot = await getDocs(q)

   querySnapshot.forEach((doc) => {
 
    setCourseList(prev => [...prev, doc.data()]);
    
  });
  setLoading(false)

  } catch (error) {
    console.log(error)
    setLoading(false)
  }
  
}

  return (
    <View style={{
      backgroundColor:Colors.DARK_BG,
    }}>
      <Image style={{
        width:'100%',
        height:150
      }} source={option?.image}/>
      <View style={{
        position:"absolute",
        padding:10,
        display:'flex',
        flexDirection:"row",
        gap:5,
        alignItems:'center',
        // backgroundColor:Colors.DARK_BG,
      }}>
        <Ionicons name="arrow-back" size={22} color="black" style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding:2
        }} 
        onPress={()=>router.back()}
        />
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:30,
          color: 'white'
        }}>{type}</Text>
      </View>

      {
        loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{
          marginTop:150
        }}/>
      }
      <CourseListGrid courseList={courseList} option={option}/>
    </View>
  )
}