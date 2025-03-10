import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Image } from 'react-native'
import Button from '../../components/Shared/Button'
import { useRouter } from 'expo-router'
import Colors from '../../constant/Colors'
import Header from '../../components/Home/Header'


export default function NoCourse() {

  const [showSettings, setShowSettings] = useState(false);

    const router = useRouter()
    

  return (
    <View style={{
        // marginTop : 90,
        display: 'flex',
        alignItems : 'center',
        backgroundColor:Colors.DARK_BG,
        height:'100%',
        padding:25
    }}>
      <Header setShowSettings={setShowSettings} showSettings={showSettings}/>
      <Image style={{
        width : 200,
        height: 250
      }} source={require('./../../assets/images/book.png')}/>

      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color:Colors.WHITE
      }}>You Don't Have Any Course</Text>
      <Button text={'+ Create New Course'} onPress={()=>router.push('/addCourse')}/>
      <Button text={'Explore Existing Courses'} type='otline' />
    </View>
  )
}