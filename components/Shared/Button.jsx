import { View, Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constant/Colors'



export default function Button({text, type='fill', onPress, loading}) {

  
  return (
    <TouchableOpacity onPress={onPress} style={{
        padding : 15,
        width: '100%',
        borderRadius : 15,
        marginTop : 15,
        backgroundColor : type === 'fill' ? Colors.PRIMARY : null,
        borderWidth :1,
        borderColor : Colors.PRIMARY 
    }}
    disabled={loading}
    >
        {
            !loading ?  <Text style={{
                textAlign: 'center',
                fontSize : 14,
                color : type === 'fill' ? 'white' : Colors.WHITE
            }}>{text}</Text>
            :
            <ActivityIndicator size={'small'} color={type === 'fill' ? Colors.WHITE : Colors.PRIMARY}/>
        }
       
    </TouchableOpacity>
  )
}