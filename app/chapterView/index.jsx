import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Progress from 'react-native-progress';
import Colors from "./../../constant/Colors"
import Button from '../../components/Shared/Button';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';


export default function ChapterView() {

    const [currentPage, setCurrentPage] = useState(0)
    const [loader, setLoader] = useState(false)
    

    const router = useRouter()

    const {chapterParams, docId, chapterIndex} = useLocalSearchParams()

    const chapters = JSON.parse(chapterParams)

    const GetProgress=(currentPage)=>{
        const perc =(currentPage / chapters?.content?.length)
        return perc
    }

const onChapterComplete =async()=>{
  console.log("docId",docId)
  setLoader(true)
  await updateDoc(doc(db,'Courses',docId),{
    completedChapter : arrayUnion(chapterIndex)
  })

  setLoader(false)
  router.replace('/courseView/' + docId)
}

  return (
    <View style={{
        padding:25,
        backgroundColor : Colors.DARK_BG,
        flex:1
    }}>
      <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('screen').width * 0.85} color={Colors.ACCENT}/>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20,
            color:Colors.TEXT_LIGHT
        }}>{chapters?.content[currentPage]?.topic}</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:16,
            marginTop:7,
            color:Colors.WHITE
        }}>{chapters?.content[currentPage]?.explain}</Text>
        {
          chapters?.content[currentPage]?.code && <Text style={[styles.codeExampleText,{backgroundColor:Colors.BLACK, color:Colors.TEXT_LIGHT}]}>{chapters?.content[currentPage]?.code}</Text>
        }
        {
          chapters?.content[currentPage]?.example && <Text style={[styles.codeExampleText,{backgroundColor: Colors.BG_GRAY,color:Colors.WHITE}]}>{chapters?.content[currentPage]?.example}</Text>
        }
       
        
      </View>
     <View style={{
      position : 'absolute',
      bottom:15,
      width:'100%',
      left:25
     }}>
      {
        chapters?.content?.length - 1 !== currentPage ?
        <Button text={'Next'} onPress={()=>setCurrentPage(currentPage + 1)}/>
        :
        <Button text={'Finish'} onPress={()=>onChapterComplete()} loading={loader}/>
      }
       
     </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  codeExampleText : {
    padding:15,
    borderRadius: 15,
    fontFamily : 'outfit',
    fontSize: 13,
    marginTop: 10,
  }
})