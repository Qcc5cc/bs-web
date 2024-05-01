// import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import { useCourses } from '@/api';
import type { CoursePost } from '@/api/courses';
import { EmptyList, Text } from '@/ui';

import { CourseShow } from './course-show';

export const CourseList = () => {
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
  const types = ['计算机', '历史', '理学', '经济学', '其他'];

  return (
    <View className="w-full flex-1 justify-between">
      {types.map((item) => {
        return (
          <View className="min-h-5 w-full  justify-between" key={item}>
            <View className="w-full">
              <Text variant="h3" className="pb-3 pt-2">
                {item}
              </Text>
              <Text
                variant="sm"
                className="absolute right-0 top-4"
                onPress={() => navigate('CourseType', { type: item })}
              >
                查看更多&gt;
              </Text>
            </View>
            <View className="min-h-200">
              <FlashList
                data={data?.filter((Item) => Item.type === item).slice(0, 4)}
                renderItem={renderItem}
                estimatedItemSize={200}
                numColumns={2}
                horizontal={false}
                ListEmptyComponent={<EmptyList isLoading={isLoading} />}
                className="justify-between"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
