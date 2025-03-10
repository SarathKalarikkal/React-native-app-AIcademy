import { View, Text,Image,FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

import Intro from '../../../components/CourseView/Intro'
import Chapters from '../../../components/CourseView/Chapters'
import Colors from '../../../constant/Colors'
import {db} from "./../../../config/firebaseConfig"
import { doc, getDoc } from 'firebase/firestore'



export default function CourseView() {

    const {courseParams, courseId, enroll} = useLocalSearchParams()

    const [course, setCourse] = useState([])
    
    console.log("courseId===",courseId);
    

    useEffect(()=>{
      if(!courseParams){
        getCourseById()
      }else{
        setCourse(JSON.parse(courseParams))
      }
      
    },[courseId])

    

    const getCourseById=async()=>{
      const docRef = await getDoc(doc(db,'Courses',courseId))
      const courseData = docRef.data()
      setCourse(courseData)
    }
    

  return (
    course &&
    <FlatList
     data={[]}
     ListHeaderComponent={
        <View style={{
            backgroundColor: Colors.DARK_BG,
            flex:1
        }}>
      <Intro course={course} enroll={enroll}/>
      <Chapters course={course}/>
    </View>
     }
    />

  
  )
}