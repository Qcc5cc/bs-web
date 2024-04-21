/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
// import { FlashList } from '@shopify/flash-list';
import { ResizeMode, Video } from 'expo-av';
import * as React from 'react';

import { useChapters } from '@/api/chapter';
import type { RouteProp } from '@/navigation/types';
import {
  Button,
  FocusAwareStatusBar,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/ui';

export const ControlInfo = () => {
  const { params } = useRoute<RouteProp<'ControlInfo'>>();
  const { navigate } = useNavigation();
  const onPress = () => {
    console.log(data);
    navigate('ChangeCourse', { course: params.course });
  };
  const goControlChapter = () => {
    navigate('ControlChapter', { id: params.course.id });
  };
  const goAddChapter = () => {
    navigate('AddChapter', { id: params.course.id });
  };
  const [course, setCourse] = React.useState(params.course);
  const { data } = useChapters({
    variables: { id: params.course.id },
  });
  const [chapters, setChapters] = React.useState(data);
  //const video = React.useRef(null);
  //const base_path = Env.SERVER_URL + '/api/course/getFileSrc' + '?path=';
  let count = 1;
  const [background, setBackground] = React.useState<string>('');

  // Env.SERVER_URL + '/api/course/getFileSrc' + '?path=' + data[0].resourceUrl
  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(Env.SERVER_URL + '/api/course/getCourseById', {
          params: { id: params.course.id },
        })
        .then((response) => setCourse(response.data.data));
      axios
        .get(Env.SERVER_URL + '/api/chapter/getChaptersByCourseId', {
          params: { course_id: params.course.id },
        })
        .then((response) => setChapters(response.data.data));
    }, [params.course])
  );
  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex justify-center px-4 pt-1">
        <ScrollView>
          {chapters?.length ? (
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
            <Button label="添加小节" variant="created" onPress={goAddChapter} />
          )}
          <View className="flex flex-row justify-start">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {chapters
                ? chapters.map(({ chapter_name, resourceUrl, id }) => {
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
          {chapters?.length ? (
            <Button label="管理" variant="created" onPress={goControlChapter} />
          ) : (
            ''
          )}
          <View>
            <Text variant="xl" className="pt-6">
              {course.course_name}
            </Text>
            <Text variant="xl" className="pt-4">
              课程简介
            </Text>
            <Text>{course.introduction}</Text>
            <Text variant="xl" className="pt-4">
              任课教师
            </Text>
            <Text>{course.teacher}</Text>
            <Button label="修改" variant="secondary" onPress={onPress} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
