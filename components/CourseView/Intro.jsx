import { View, Text,Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { imageAssets } from '../../constant/Option'
import Feather from '@expo/vector-icons/Feather';
import Colors from '../../constant/Colors';
import Button from '../Shared/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { UserDetailContext } from '../../context/UserDetailContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';



export default function Intro({course, enroll}) {

    const [loading, setLoading] = useState()
    

    const router = useRouter()

    const {userDetail, setUserDetail} = useContext(UserDetailContext)

    const onEnrollCourse =async()=>{
        setLoading(true)
        const docId = Date.now().toString()

        const data ={
            ...course,
            createdBy : userDetail?.email,
            createdOn :new Date(),
            enrolled : true
        }

        await setDoc(doc(db,'Courses', docId),data)

        router.push({
            pathname : '/courseView/' + docId,
            params :{
                courseParams : JSON.stringify(data),
                enroll : false
            }
        })
        setLoading(false)
    }

  return (
    <View >
      
       <Image style={{
        width : '100%',
        height : 200
       }} source={imageAssets[course?.banner_image]}/>
       <View style={{
        padding:20
       }}>
         <Text style={{
            fontFamily:'outfit-bold',
            fontSize:18,
            color:Colors.WHITE
         }}>{course?.courseTitle}</Text>
        <View style={{
                    display : 'flex',
                    alignItems: 'center',
                    flexDirection : 'row',
                    gap : 5,
                    marginTop: 5,
                }}>
                        <Feather name="book-open" size={15} color={Colors.ACCENT} />
                        <Text style={{
                    fontFamily : 'outfit',
                    fontSize : 15,
                    color:Colors.ACCENT
                }}>{course?.chapters?.length} Chapters</Text>
                </View>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize: 15,
                    marginTop:10,
                    color:Colors.WHITE
                }}>Description :</Text>
                <Text style={{
                    fontFamily : 'outfit',
                    fontSize : 14,
                    color:Colors.WHITE
                }}>{course?.description}</Text>
                {
                    enroll == 'true' ?
                        <Button text={'Enroll Now'} onPress={()=>onEnrollCourse()} loading={loading}/>
                        :
                        <Button text={'Start Now'} />
                }
                 
       </View>
       <Pressable style={{
            position:"absolute",
            padding:10,

        }}
        onPress={()=>router.back()}
        >
            <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
    </View>
  )
}