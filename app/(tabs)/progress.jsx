import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Image } from 'react-native'
import { UserDetailContext } from '../../context/UserDetailContext';
import CourseProgressCard from '../../components/Shared/CourseProgressCard';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';



export default function Progress() {

// const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail, courseList, setCourseList } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  

  const router = useRouter()

  useEffect(() => {
    GetCourses();
  }, []);

  const GetCourses = async () => {
    setLoading(true);
    setCourseList([]);

    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email),
      orderBy('createdOn','desc')
    );

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View style={{
      backgroundColor:Colors.DARK_BG,
      height:'100%'
    }}>
       <Image style={{
            position : 'absolute',
            width:'100%',
           
          }} source={ require("./../../assets/images/wave.png") }/>
        <View style={{
          width:'100%',
          position:'absolute',
          padding:20,
          backgroundColor:Colors.DARK_BG
        }}>
          <Text style={{
            fontFamily:'outfit-bold',
            fontSize:25,
            color:Colors.WHITE,
            marginBlock:10
          }}>Course Progress</Text>
          <FlatList
           data={courseList}
           showsVerticalScrollIndicator={false}
           onRefresh={()=>GetCourses}
           refreshing={loading}
           renderItem={({item,index})=>(
            <TouchableOpacity  onPress={()=>router.push({
              pathname : '/courseView/' + item?.docId,
              params :{
                  courseParams : JSON.stringify(item)
              }
          })}>
              <CourseProgressCard item={item} width={'95%'}/>  
            </TouchableOpacity>
           )}
          />
        </View>
    </View>
  )
}