import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { PraticeOption } from '../../constant/Option'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'


export default function PraticeSection() {

 const router = useRouter()
 
  
  return (
    <View style={{marginTop: 10}}>
      <Text style={{
        fontFamily : 'outfit-bold',
        fontSize :20,
        marginTop: 10,
        color:Colors.WHITE,
      }}>Pratice</Text>

      <View>
         <FlatList
            data={PraticeOption}
            numColumns={3}
            renderItem={({item, index})=>(
                <TouchableOpacity onPress={()=>router.push('/practice/' + item?.name)} key={index} style={{
                    flex : 1,
                    margin: 5,
                    aspectRatio: 0.8
                }}>
                    <Image source={item?.image} style={{
                        width : "100%",
                        height : "100%",
                        maxHeight : 180,
                        borderRadius : 15
                    }}/>
                    <Text style={{
                        position:'absolute',
                        padding:8,
                        fontSize:13,
                        fontFamily:'outfit',
                        color: 'white'
                    }}>{item.name}</Text>
                </TouchableOpacity>
            )}
         />
      </View>
    </View>
  )
}