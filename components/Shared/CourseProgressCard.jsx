import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constant/Colors'
import * as Progress from 'react-native-progress';
import { imageAssets } from '../../constant/Option';


export default function CourseProgressCard({item, width=200}) {

  

const getCompletedChapters =(course)=>{
    const completedChapters = course?.completedChapter?.length
    const perc = completedChapters / course?.chapters?.length
    return perc
}

return (
    <View
      style={{
        margin: 7,
        padding: 10,
        backgroundColor:Colors.SECONDARY,
        borderRadius: 15,
        width: width,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
      }}
    >
      {/* Course Image & Info */}
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center"}}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
          }}
          source={imageAssets[item?.banner_image]}
        />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "outfit-bold",
              fontSize: 14,
              color: Colors.TEXT_DARK,
            }}
          >
            {item?.courseTitle}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 12,
              marginTop: 4,
              color: Colors.WHITE,
            }}
          >
            {item?.chapters?.length ?? 0} Chapters
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={{ marginTop: 10 }}>
        <Progress.Bar
          progress={getCompletedChapters(item)}
          width={width - 20}
          color={Colors.ACCENT}
          borderRadius={10}
          height={4}
        />
        <Text
          style={{
            fontFamily: "outfit",
            marginTop: 5,
            fontSize: 11,
            color: Colors.TEXT_LIGHT,
          }}
        >
          {item?.completedChapter?.length ?? 0} out of {item?.chapters?.length ?? 0} chapters completed
        </Text>
      </View>
    </View>
  );
}