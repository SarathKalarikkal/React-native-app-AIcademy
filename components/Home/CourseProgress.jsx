import { View, Text, FlatList, Image} from 'react-native'
import React, { useContext } from 'react'
import { imageAssets } from '../../constant/Option'
import Colors from '../../constant/Colors'

import CourseProgressCard from '../Shared/CourseProgressCard';



export default function CourseProgress({courseList}) {
  


  return (
    <View style={{
        marginTop: 10
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize : 20,
         color:Colors.WHITE
      }}>Progress</Text>

      <FlatList
       data= {courseList}
       showsHorizontalScrollIndicator={false}
       horizontal={true}
       renderItem={({item, index})=>(
        <View key={index}>
             <CourseProgressCard item={item} />
        </View>
       )}
      />
    </View>
  )
}