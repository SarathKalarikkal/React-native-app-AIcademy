import { View, Text, FlatList,Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { imageAssets } from '../../constant/Option'
import Colors from '../../constant/Colors'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';


export default function CourseList({courseList, heading='Courses', enroll='false'}) {

    const router =useRouter()

    

    return (
        <View style={styles.container}>
          {/* Section Heading */}
          <Text style={[styles.heading,{color: Colors.WHITE}]}>{heading}</Text>
    
          <FlatList
            data={courseList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/courseView/" + item?.docId,
                    params: {
                      courseParams: JSON.stringify(item),
                      enroll: enroll,
                    },
                  })
                }
                style={[styles.courseContainer,{backgroundColor: Colors.SECONDARY}]}
              >
                {/* Course Image */}
                <Image source={imageAssets[item.banner_image]} style={styles.courseImage} />
    
                {/* Course Title */}
                <Text numberOfLines={2} style={[styles.courseTitle,{color: Colors.WHITE}]}>
                  {item.courseTitle}
                </Text>
    
                {/* Course Info */}
                <View style={styles.courseInfo}>
                  <Feather name="book-open" size={15} color={Colors.ACCENT} />
                  <Text style={[styles.chapterText,{ color: Colors.ACCENT}]}>{item.chapters?.length ?? 0} Chapters</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    
    // Styles
    const styles = StyleSheet.create({
      container: {
        marginTop: 15,
      },
      heading: {
        fontFamily: "outfit-bold",
        fontSize: 20,
        marginBottom: 10,
        
      },
      courseContainer: {
        padding: 12,
      
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
      },
    });