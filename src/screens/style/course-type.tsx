// import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { useCourses } from '@/api';
import type { CoursePost } from '@/api/courses';
import type { RouteProp } from '@/navigation/types';
import { EmptyList, FocusAwareStatusBar, Text } from '@/ui';

import { CourseShow } from './course-show';

export const CourseType = () => {
  const { params } = useRoute<RouteProp<'CourseType'>>();

  const { data, isLoading, isError } = useCourses();

  const courses = data?.filter((Item) => Item.type === params.type);
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
    <View>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="w-full flex-1 justify-between">
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
    </View>
  );
};
