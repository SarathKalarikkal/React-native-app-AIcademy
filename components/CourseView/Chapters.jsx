import { View, Text ,FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import Foundation from '@expo/vector-icons/Foundation';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function Chapters({course}) {

const router = useRouter()


const isChapterCompleted = (index)=>{
  const isCompleted = course?.completedChapter?.find((item)=> item == index)
  return isCompleted ? true : false
}

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        color:Colors.WHITE
      }}>Chapters</Text>
      <FlatList
        data={course?.chapters}
        renderItem={({item,index})=>(
            <TouchableOpacity
            onPress={()=>router.push({
                pathname : '/chapterView',
                params : {
                    chapterParams :JSON.stringify(item),
                    docId : course?.docId,
                    chapterIndex : index
                }
            })}
            style={{
                padding:15,
                borderWidth:0.5,
                borderRadius:15,
                borderColor:Colors.PRIMARY,
                marginTop:10,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
            }} 
            key={index}
            >
                <View style={{
                    display:'flex',
                    flexDirection : 'row',
                    gap:10,
                    width:'70%'
                }}>
                  <Text style={[styles.chapterText,{color:Colors.WHITE}]}>{index + 1}.</Text>
                  <Text style={[styles.chapterText,{color:Colors.WHITE}]}>{item?.chapterName}</Text>
                </View>
                {
                  isChapterCompleted(index) ?
                  <AntDesign name="checkcircle" size={20} color={Colors.LIGHT_GREEN} />
                  :
                  <Foundation name="play" size={24} color={Colors.PRIMARY} />
                }
                
                
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    chapterText :{
        fontFamily : 'outfit',
        fontSize: 15,
        
    }
})