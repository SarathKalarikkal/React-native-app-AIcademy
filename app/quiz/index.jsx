import { View, Text, Image, Pressable, Dimensions, TouchableOpacity,ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';
import Button  from '../../components/Shared/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';




export default function Quiz() {

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedOption, setSelectedOption] = useState()
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

    const {courseParams} = useLocalSearchParams()

    
    
    const course = JSON.parse(courseParams)

    const quiz = course?.quiz

    const router = useRouter()

    const progressBar =(currentPage)=>{
      const perc = (currentPage / quiz?.length)
      return perc
      
    }

    const onOptionSelected =(selectedOptions)=>{
        setResult((prev)=>({
          ...prev,
          [currentPage] : {
            userChoice : selectedOptions,
            isCorrect : quiz[currentPage]?.correctAns == selectedOptions,
            question : quiz[currentPage]?.question,
            correctAns :quiz[currentPage]?.correctAns 
          }
        }))

    }

const onQuizFinish =async()=>{
  setLoading(true)
  try {
    await updateDoc(doc(db,'Courses',course?.docId),{
      quizResult : result
    })
    setLoading(false)
    router.replace({
      pathname : '/quiz/summary',
      params : {
        quizResultParams : JSON.stringify(result)
      }
    })
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
  
}


  return (
    <View style={{
      backgroundColor:Colors.DARK_BG
    }}>
    <Image 
  source={require('./../../assets/images/wave.png') } 
  style={{
    height: 800,
    width: '100%'
  }}
/>
      <View style={{
        position: 'absolute',
        padding:25,
       width:'100%',
       
      }}>
        <View style={{
            display:'flex',
            flexDirection : 'row',
            justifyContent:'space-between',
            alignItems : 'center',
            paddingBottom: 10,
            
        }}>
            <Pressable>
            {
              currentPage == 0 ? 
              <Ionicons name="arrow-back" size={20} color="white" onPress={()=>router.back()}/>
              :
              <Ionicons name="arrow-back" size={20} color="white" onPress={()=>setCurrentPage(currentPage - 1)}/>
            }
            </Pressable>
            <Text style={{
                color:'white',
                fontFamily:'outfit-bold'
            }}>{currentPage + 1} of {quiz?.length} questions</Text>
        </View>

            <View style={{
                marginTop:10
                
            }}>
            <Progress.Bar progress={progressBar(currentPage)} width={Dimensions.get('window').width * 0.85} color={Colors.WHITE} height={10}/>
            </View>

            <View style={{
                padding:20,
                backgroundColor:Colors.SECONDARY,
                marginTop:15,
                height:'auto',
                elevation:1,
                borderRadius: 20
            }}>

              <Text style={{
                fontFamily:'outfit-bold',
                fontSize:18,
                textAlign:'center',
                color:Colors.WHITE
              }}>{quiz[currentPage]?.question}</Text>

              {
                quiz[currentPage]?.options.map((item, index)=>(
                  <TouchableOpacity
                  onPress={()=>{
                    setSelectedOption(index)
                    onOptionSelected(item)
                  }}
                  key={index} style={{
                    padding:10,
                    borderWidth:1,
                    borderRadius:15,
                    marginTop:8,
                    borderColor: selectedOption == index ? Colors.GREEN : Colors.WHITE,
                    backgroundColor : selectedOption == index ? Colors.LIGHT_GREEN : null
                  }}>
                      <Text style={{
                         fontFamily:'outfit',
                         fontSize:15,
                         color:selectedOption == index ? Colors.BLACK : Colors.WHITE,
                      }}>{item}</Text>
                  </TouchableOpacity>
                ))
              }
          {
            (selectedOption?.toString() && quiz?.length - 1 > currentPage) &&  <Button text={'Next'} onPress={()=>{
              setCurrentPage(currentPage + 1);
               setSelectedOption(null)
            }} />
           }
           {
            (selectedOption?.toString() && quiz?.length - 1 == currentPage) &&  <Button loading={loading} text={'Finish'} onPress={()=>onQuizFinish()} />
           }
            </View>
           

      </View>
    </View>
  )
}