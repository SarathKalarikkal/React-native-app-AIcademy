import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Button from "../../components/Shared/Button";


export default function Summary() {
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const { quizResultParams } = useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParams);
  const router = useRouter();

  

  useEffect(() => {
    CalculateResult();
  }, []);

  const CalculateResult = () => {
    if (quizResult) {
      const correctAnswers = Object.entries(quizResult).filter(
        ([, value]) => value?.isCorrect
      ).length;
      setCorrectAns(correctAnswers);
      setTotalQuestions(Object.keys(quizResult).length);
    }
  };

  const GetPercMark = () => {
    return totalQuestions > 0 ? ((correctAns / totalQuestions) * 100).toFixed(0) : 0;
  };

  return (
    <FlatList
      data={[]} // Empty data to use ListHeaderComponent
      ListHeaderComponent={
        <View style={[styles.container,{backgroundColor:Colors.DARK_BG}]}>
          {/* Background Image */}
          <Image source={require("./../../assets/images/wave.png")} style={[styles.backgroundImage,{backgroundColor:Colors.DARK_BG}]} />

          {/* Content Overlay */}
          <View style={styles.contentContainer}>
            <Text style={[styles.title,{color: 'white'}]}>Quiz Summary</Text>

            {/* Quiz Result Box */}
            <View style={[styles.resultContainer,{ backgroundColor: Colors.SECONDARY}]}>
              <Image source={GetPercMark() > 60 ? require("./../../assets/images/trophy.png") : require('./../../assets/images/failed.png')} style={styles.trophyImage} />
              <Text style={[styles.resultText,{color:Colors.WHITE}]}>{GetPercMark() > 60 ? "Congratulations!" : "Try Again"}</Text>
              <Text style={[styles.scoreText,{color: Colors.TEXT_LIGHT}]}>You gave {GetPercMark()}% Correct Answers</Text>

              {/* Score Details */}
              <View style={styles.scoreContainer}>
                <View style={[styles.resultTextContainer,{ borderColor: Colors.GREY}]}>
                  <Text style={[styles.resultNumber,{color:'white'}]}>Q {totalQuestions}</Text>
                </View>
                <View style={[styles.resultTextContainer,{ borderColor: Colors.GREY}]}>
                  <Text style={[styles.resultNumber,{color:'white'}]}>
                    <AntDesign name="checkcircle" size={18} color={Colors.GREEN} /> {correctAns}
                  </Text>
                </View>
                <View style={[styles.resultTextContainer,{ borderColor: Colors.GREY}]}>
                  <Text style={[styles.resultNumber,{color:Colors.WHITE}]}>
                    <Entypo name="circle-with-cross" size={20} color="red" /> {totalQuestions - correctAns}
                  </Text>
                </View>
              </View>
            </View>

            {/* Back to Home Button */}
            <Button text={"Back To Home"} onPress={() => router.replace("/(tabs)/home")} />

            {/* Summary List */}
            <View style={styles.summaryContainer}>
              <Text style={[styles.summaryTitle,{color:Colors.WHITE}]}>Summary:</Text>
              <FlatList
                data={Object.entries(quizResult)}
                renderItem={({ item, index }) => {
                  const quizItem = item[1];
                  return (
                    <View
                      key={index}
                      style={[
                        styles.quizItem,
                        {
                          backgroundColor: quizItem?.isCorrect ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                          borderColor: quizItem?.isCorrect ? Colors.GREEN : Colors.RED,
                        },
                      ]}
                    >
                      <Text style={[styles.questionText,{color: !quizItem?.isCorrect ? 'red' : 'black'}]}>{quizItem?.question}</Text>
                      <Text style={[styles.answerText,{color: !quizItem?.isCorrect ? 'red' : 'black'}]}>Ans: {quizItem?.correctAns}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  backgroundImage: {
    width: "100%",
    height: 700,
    position: "absolute",
    
  },
  contentContainer: {
    padding: 35,
    width: "100%",
    
  },
  title: {
    textAlign: "center",
    fontFamily: "outfit-bold",
    fontSize: 30,
    
  },
  resultContainer: {
   
    padding: 20,
    borderRadius: 20,
    marginTop: 60,
    alignItems: "center",
  },
  trophyImage: {
    width: 100,
    height: 100,
    marginTop: -60,
  },
  resultText: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    
  },
  scoreText: {
    fontFamily: "outfit",
    fontSize: 14,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  resultTextContainer: {
    padding: 15,
    borderWidth: 0.3,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  resultNumber: {
    fontFamily: "outfit",
    fontSize: 18,
  },
  summaryContainer: {
    marginTop: 15,
    flex: 1,
  },
  summaryTitle: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    
  },
  quizItem: {
    padding: 15,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 15,
    
  },
  questionText: {
    fontFamily: "outfit",
    fontSize: 15,
    
  },
  answerText: {
    fontFamily: "outfit",
    fontSize: 13,
  },
});
