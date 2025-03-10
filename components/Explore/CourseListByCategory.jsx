import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { imageAssets } from '../../constant/Option';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import CourseList from '../Home/CourseList';


export default function CourseListByCategory({ category }) {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        GetCourseListByCategory(category);
    }, [category]);

    const GetCourseListByCategory = async (category) => {
        try {
            setLoading(true);
            setCourseList([]);

            const q = query(
                collection(db, 'Courses'),
                where('category', '==', category),
                orderBy('createdOn', 'desc')
            );

            const querySnapShot = await getDocs(q);

            querySnapShot?.forEach((doc)=>{
                setCourseList(prev => [...prev,doc.data()])
            })

            // const courses = querySnapShot.docs.map(doc => ({
            //     id: doc.id,
            //     ...doc.data()
            // }));

            // setCourseList(courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    return  (
        <View>
          {courseList?.length > 0 && <CourseList courseList={courseList} heading={category} enroll={true}/>}
        </View>
    );
}

  const styles = StyleSheet.create({
      container: {
        marginTop: 15,
      },
      heading: {
        fontFamily: "outfit-bold",
        fontSize: 20,
        marginBottom: 10,
        // color: Colors.WHITE,
      },
      courseContainer: {
        padding: 12,
        // backgroundColor: Colors.SECONDARY,
        marginRight: 12,
        borderRadius: 15,
        width: 220,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
      },
      courseImage: {
        width: "100%",
        height: 140,
        borderRadius: 12,
      },
      courseTitle: {
        fontFamily: "outfit-bold",
        fontSize: 14,
        marginTop: 8,
        // color: Colors.WHITE,
      },
      courseInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 5,
      },
      chapterText: {
        fontFamily: "outfit",
        fontSize: 12,
        // color: Colors.ACCENT,
      },
    });
