// import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';

import { useCourses } from '@/api';
import type { CoursePost } from '@/api/courses';
import { EmptyList } from '@/ui';

import { CourseShow } from './course-show';

export const CourseList = () => {
  const { data, isLoading, isError } = useCourses();
  // React.useEffect(() => {
  //   if (data)
  //     data.forEach((val, index) => {
  //       if (val.imageUrl)
  //         data[index].imageUrl =
  //           'data:image/png;base64,' + data[index].imageUrl;
  //       else {
  //         data[index].imageUrl =
  //           'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
  //       }
  //     });
  // }, [data]);

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
      className="w-full justify-between"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        minHeight: 2,
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
