import { View, Text,Image, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function QuestionAnswer() {

const [selectedQuestion, setSelectedQuestion] =useState()


const router = useRouter()

const {courseParams} =useLocalSearchParams()
const course = JSON.parse(courseParams)
const qaList = course?.qa


const onQuestionSelected=(index)=>{
    if(selectedQuestion == index){
        setSelectedQuestion(null)
    }else{
        setSelectedQuestion(index)
    }
}



return (
    <View style={[styles.container,{backgroundColor: Colors.DARK_BG}]}>
      <Image
        source={require('./../../assets/images/wave.png') }
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={[styles.title,{ color: 'white'}]}>Question & Answers</Text>
        </View>
        <Text style={[styles.subtitle,{color: 'white'}]}>{course?.courseTitle}</Text>

        {/* Fix: Added flex to FlatList container */}
        <FlatList
          data={qaList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }} // Ensures scrolling space
          keyboardShouldPersistTaps="handled"
          renderItem={({ item, index }) => (
            <Pressable
              style={[styles.card,{backgroundColor: Colors.SECONDARY}]}
              onPress={() => onQuestionSelected(index)}
            >
              <Text style={[styles.questionText,{color: Colors.WHITE}]}>{item?.questions}</Text>
              {selectedQuestion === index && (
                <View style={styles.answerContainer}>
                  <Text style={[styles.answerText,{color: Colors.ACCENT}]}>{item?.answer}</Text>
                </View>
              )}
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensures the whole screen is covered
      
    },
    image: {
      height: 800,
      width: '100%',
      position: 'absolute',
    },
    contentContainer: {
      flex: 1, // Allows FlatList to scroll
      padding: 20,
      marginTop: 25,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },
    title: {
      fontFamily: 'outfit-bold',
      fontSize: 20,
    
    },
    subtitle: {
      fontFamily: 'outfit',
      fontSize: 15,
      marginBottom: 10,
    },
    card: {
      padding: 18,
      marginTop: 15,
      borderRadius: 15,
      elevation: 1,
    },
    questionText: {
      fontFamily: 'outfit',
      fontSize: 15,
    
    },
    answerContainer: {
      borderTopWidth: 0.4,
      marginTop: 10,
      paddingTop: 10,
    },
    answerText: {
      fontFamily: 'outfit',
      fontSize: 14,
      
    },
  });