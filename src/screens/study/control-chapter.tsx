/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { Button as RNButton } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import type { Chapter } from '@/api';
import { useChapters } from '@/api';
import type { RouteProp } from '@/navigation/types';
import { Button, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';

export const ControlChapter = () => {
  const { params } = useRoute<RouteProp<'AddChapter'>>();
  const { navigate } = useNavigation();
  const { data } = useChapters({
    variables: { id: params.id },
  });
  let count = 1;
  const goAddChapter = () => {
    navigate('AddChapter', { id: params.id });
  };
  const delChapter = (id: number) => {
    axios.get(Env.SERVER_URL + '/api/chapter/delete', {
      params: { id: id },
    });
    // axios
    //   .get(Env.SERVER_URL + '/api/chapter/getChaptersByCourseId', {
    //     params: { course_id: params.id },
    //   })
    //   .then((response) => setChapters(response.data.data));
    showMessage({
      message: 'Course added successfully',
      type: 'success',
    });
  };
  const changeChapter = (chapter: Chapter) => {
    navigate('ChangeChapter', { chapter: chapter });
  };
  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(Env.SERVER_URL + '/api/chapter/getChaptersByCourseId', {
          params: { course_id: params.id },
        })
        .then((response) => setChapters(response.data.data));
    }, [params.id])
  );
  const [chapters, setChapters] = React.useState(data);
  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex justify-center px-4 pt-1">
        <ScrollView>
          {chapters
            ? chapters.map((item, index) => {
                return (
                  <View
                    className="relative mt-4  flex h-[70px] w-[380px] flex-row self-center pt-5"
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      borderColor: '#87CEEB',
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingBottom: 3,
                    }}
                    key={item.id}
                  >
                    <Text variant="xl">第{count++}节</Text>
                    <Text className="pl-2">{item.chapter_name}</Text>
                    <View className="absolute right-0 bottom-0 flex flex-row">
                      <RNButton
                        title="修改"
                        onPress={() => {
                          changeChapter(item);
                        }}
                      />
                      <RNButton
                        title="删除"
                        color="#eb001b"
                        onPress={() => {
                          setChapters(
                            chapters
                              .slice(0, index)
                              .concat(chapters.slice(index + 1))
                          );
                          delChapter(item.id);
                        }}
                      />
                    </View>
                  </View>
                );
              })
            : ''}
          <View className="pt-10">
            <Button
              label="添加小节"
              onPress={goAddChapter}
              variant="secondary"
              testID="add-course-button"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
