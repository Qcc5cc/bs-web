/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
// import { FlashList } from '@shopify/flash-list';
import { ResizeMode, Video } from 'expo-av';
import * as React from 'react';

import { useChapters } from '@/api/chapter';
import { getItem } from '@/core/storage';
import type { RouteProp } from '@/navigation/types';
import {
  Button,
  FocusAwareStatusBar,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/ui';

export const CourseInfo = () => {
  const { params } = useRoute<RouteProp<'CourseInfo'>>();
  const [butState, setButState] = React.useState(0);
  React.useEffect(() => {
    axios({
      method: 'get',
      url: Env.SERVER_URL + '/api/course/search',
      params: {
        stuId: getItem('userId'),
        courseId: params.course.id,
      },
    }).then(function (response) {
      if (!response.data.data) {
        setButState(1);
        // setBackground(
        //   Env.SERVER_URL +
        //     '/api/course/getFileSrc' +
        //     '?path=' +
        //     data[0].resourceUrl
        // );
      }
    });
  });
  const onPress = () => {
    axios({
      method: 'get',
      url: Env.SERVER_URL + '/api/course/stuAddCourse',
      params: {
        stuId: getItem('userId'),
        courseId: params.course.id,
      },
    });
    setButState(1);
  };
  const { data } = useChapters({
    variables: { id: params.course.id },
  });
  //const video = React.useRef(null);
  // const base_path = Env.SERVER_URL + '/api/course/getFileSrc' + '?path=';
  let count = 1;
  const [background, setBackground] = React.useState<string>('');
  // Env.SERVER_URL + '/api/course/getFileSrc' + '?path=' + data[0].resourceUrl
  // base_path + 'D:/upload/video/184734-873923034_small.mp4'

  // base_path + 'D:/upload/video/184734-873923034_small.mp4'
  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex justify-center px-4 pt-1">
        <ScrollView>
          {data?.length ? (
            <View>
              <Video
                //ref={video}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  alignSelf: 'center',
                  width: 320 * 1.3,
                  height: 200 * 1.3,
                }}
                source={{ uri: background }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            </View>
          ) : (
            ''
          )}
          <View className="flex flex-row justify-start">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {data
                ? data.map(({ chapter_name, resourceUrl, id }) => {
                    return (
                      <Pressable
                        className="mr-4 ml-1 h-[80px] w-[130px]"
                        onPress={() => {
                          setBackground(
                            Env.SERVER_URL +
                              '/api/course/getFileSrc' +
                              '?path=' +
                              resourceUrl
                          );
                        }}
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          backgroundColor: '#DCDCDC',
                          borderColor: '#87CEEB',
                          borderWidth: 1,
                          borderRadius: 5,
                        }}
                        key={id}
                      >
                        <Text className="font-sans text-base">
                          第{count++}节
                        </Text>
                        <Text className="font-sans text-sm">
                          {chapter_name}
                        </Text>
                      </Pressable>
                    );
                  })
                : ''}
            </ScrollView>
          </View>
          <View>
            <Text variant="xl" className="pt-6">
              {params.course.course_name}
            </Text>
            <Text variant="xl" className="pt-4">
              课程简介
            </Text>
            <Text>{params.course.introduction}</Text>
            <Text variant="xl" className="pt-4">
              任课教师
            </Text>
            <Text>{params.course.teacher}</Text>
            {!butState ? (
              <Button label="加入课程" variant="secondary" onPress={onPress} />
            ) : (
              <Button label="已加入课程" variant="secondary" disabled />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
