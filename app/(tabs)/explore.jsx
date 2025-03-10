import { View, Text, FlatList,ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constant/Colors'
import { CourseCategory } from '../../constant/Option'
import CourseListByCategory from '../../components/Explore/CourseListByCategory'



export default function Explore() {

  

  return (
    <ScrollView
    style={{
      flex:1,
      backgroundColor:Colors.DARK_BG,
      marginBottom:50
    }} >

<View style={{
      padding:25,
      backgroundColor:Colors.DARK_BG,
     flex:1
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        color:Colors.WHITE
      }}>Explore More Courses</Text>

     {
      CourseCategory.map((item,index)=>(
        <View key={index} style={{
          marginTop:10
        }}>
         
          <CourseListByCategory category={item}/>
        </View>
      ))
     } 
    </View>
    </ScrollView>
    
  )
}