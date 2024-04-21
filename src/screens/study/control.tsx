import { Env } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import * as React from 'react';

import { type CoursePost, useOwnedCourses } from '@/api';
import { getItem } from '@/core/storage';
import { EmptyList, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';

import { CourseShow } from '../style';

export const Control = () => {
  const { data, isLoading, isError } = useOwnedCourses({
    variables: { id: getItem('userId') },
  });
  const userId = getItem('userId');
  const [courses, SetCourses] = React.useState(data);
  const { navigate } = useNavigation();
  const renderItem = React.useCallback(
    ({ item }: { item: CoursePost }) => (
      <CourseShow
        {...item}
        onPress={() => navigate('ControlInfo', { course: item })}
      />
    ),
    [navigate]
  );
  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(Env.SERVER_URL + '/api/course/getOwnedCourses', {
          params: { teacherId: userId },
        })
        .then((response) => SetCourses(response.data.data));
    }, [userId])
  );
  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="w-full flex-1 justify-between  px-4 pt-7">
          <FlashList
            data={courses}
            renderItem={renderItem}
            estimatedItemSize={200}
            numColumns={2}
            horizontal={false}
            ListEmptyComponent={<EmptyList isLoading={isLoading} />}
            className="justify-between"
          />
        </View>
      </ScrollView>
    </>
  );
};
