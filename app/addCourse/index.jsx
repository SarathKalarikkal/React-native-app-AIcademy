import { View, Text, TextInput, StyleSheet, Pressable, ScrollView} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { GeneateCourseAIModel, GeneateTopicsAIModel } from "../../config/AiModel";
import Prompt from "../../constant/Prompt";
import {db} from "../../config/firebaseConfig"
import { doc, setDoc } from 'firebase/firestore';
import { UserDetailContext } from "../../context/UserDetailContext";
import { useRouter } from "expo-router";



export default function AddNewCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [topic, setTopic] = useState([]);
  const [selectedTopics, ssetSelectTopics] = useState([]);

   const {userDetail, setUserDetail, courseList, setCourseList} = useContext(UserDetailContext)
   

   const router = useRouter()

  const onGenerateTopic = async () => {
    setLoading(true);

    const PROMPT = userInput + Prompt.IDEA;

    const AIresponse = await GeneateTopicsAIModel.sendMessage(PROMPT);

    const topicIdea = JSON.parse(AIresponse.response.text());



    setTopic(topicIdea?.course_titles);
    setLoading(false);
  };

  const onTopicSelect = (topic) => {
    const isAlreadyExist = selectedTopics.find((item) => item == topic);

    if (!isAlreadyExist) {
      ssetSelectTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);
      ssetSelectTopics(topics);
    }
  };

  const isTopicSelected = (topic) => {
    const selection = selectedTopics.find((item) => item == topic);
    return selection ? true : false;
  };

const OnGenerateCourse =async()=>{

    setLoading(true)

    const PROMPT = selectedTopics + Prompt.COURSE

    try {
        const AIResponse = await GeneateCourseAIModel.sendMessage(PROMPT)

        const resp = JSON.parse(AIResponse.response.text())

        const courses = resp.courses
    
       
    
        courses.forEach(async(course)=>{

          const docId = Date.now().toString()

            await setDoc(doc(db, 'Courses',docId ),{
                ...course,
                createdOn : new Date(),
                createdBy : userDetail?.email,
                docId:docId
            })
            setCourseList(prev =>[...prev, course])
        })
        router.push('/(tabs)/home')
        setLoading(false)
    } catch (error) {
        setLoading(false)
    }
    
}


  return (
    <ScrollView
      style={{
        padding: 25,
        backgroundColor: Colors.CARD_BG,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          color:Colors.WHITE
        }}
      >
        Create New Course
      </Text>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 18,
          color:Colors.TEXT_LIGHT
        }}
      >
        What you want to learn today?
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 14,
          marginTop: 8,
          color:Colors.WHITE
        }}
      >
        What course you want to create (ex.Learn Python, Digital Marketting, 10th
        Science Chapters, etc...)
      </Text>

      <TextInput
        onChangeText={(value) => setUserInput(value)}
        style={[styles.textInput,{borderColor:Colors.PRIMARY,color: Colors.WHITE}]}
        numberOfLines={3}
        multiline={true}
        placeholder="(Ex. Learn Python, Learn 12th Chemistry)"
        placeholderTextColor={'grey'}
      ></TextInput>
      <Button
        type="outline"
        text={"Generate Topic"}
        onPress={onGenerateTopic}
        loading={loading}
      />

      <View
        style={{
          marginTop: 15,
          marginBottom: 10,
          paddingBottom: 100
        }}
      >
        {
          topic.length > 0 &&
          <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            color:Colors.WHITE
          }}
        >
          Select all topics which you want to add in the course
        </Text>
        }
        

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 6,
          }}
        >
          {topic.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={{
                  padding: 7,
                  borderWidth: 0.4,
                  borderRadius: 99,
                  borderColor:isTopicSelected(item) ? null : Colors.ACCENT,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item)
                    ? Colors.PRIMARY
                    : null,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.ACCENT,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        {selectedTopics?.length > 0 && (
        <Button
          text={"Generate Course"}
          onPress={OnGenerateCourse}
          loading={loading}
        />
      )}
      </View>

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 14,
    
  },
});
