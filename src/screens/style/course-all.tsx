// import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import { useCourses } from '@/api';
import type { CoursePost } from '@/api/courses';
import { EmptyList, Text } from '@/ui';

import { CourseShow } from './course-show';

export const CourseAll = () => {
  const { data, isLoading, isError } = useCourses();

  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: CoursePost }) => (
      <CourseShow
        {...item}
        onPress={() => navigate('CourseInfo', { course: item })}
      />
    ),
    [navigate]
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <View
      className="w-full flex-1 justify-between"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        minHeight: 20,
      }}
    >
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={200}
        numColumns={2}
        horizontal={false}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        className="justify-between"
      />
    </View>
  );
};
