import { View, Text, Platform, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from "../../constant/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseList from "../../components/Home/CourseList";
import PraticeSection from "../../components/Home/PraticeSection";
import CourseProgress from "../../components/Home/CourseProgress";
import { Image } from "react-native";

import SidebBar from "../../components/Home/SidebBar";



export default function Home() {
  const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // const { courseList } = useContext(UserDetailContext);

  useEffect(() => {
    GetCourseList();
  }, []);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log("--", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <>
    <FlatList
      data={courseList}
      onRefresh={GetCourseList}
      refreshing={loading}
      ListHeaderComponent={
        <View style={{
          flex: 1,
            backgroundColor: Colors.DARK_BG,
            paddingBottom:60
        }}>
          <Image style={{
            position : 'absolute',
            width:'100%',
            height:600
          }} source={require("./../../assets/images/wave.png") }/>
        <View
          style={{
            padding: 20,
            paddingTop: Platform.OS == "ios" && 45,
            
          }}
        >
          <Header setShowSettings={setShowSettings} showSettings={showSettings}/>
          <View>
              <CourseProgress courseList={courseList} />
              <PraticeSection />
              <CourseList courseList={courseList} />
            </View>
        </View>


        { showSettings && <SidebBar showSettings={showSettings} setShowSettings={setShowSettings} /> }

          

        </View>
         
      }
      
    />
    </>
  );
}
