/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import { Env } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { type CoursePost, useMyCourses } from '@/api/courses';
import { getItem } from '@/core/storage';
import { CourseShow } from '@/screens/style';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

export const MyCourses = () => {
  const { data, isLoading, isError } = useMyCourses({
    variables: { id: getItem('userId') },
  });
  // const { data, isLoading, isError } = useCourses();
  const [courses, setCourses] = React.useState(data);
  const { navigate } = useNavigation();
  let ch = 0;
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
  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(Env.SERVER_URL + '/api/course/getMyCourses', {
          params: { stuId: getItem('userId') },
        })
        .then((response) => setCourses(response.data.data));
      ch++;
    }, [ch])
  );
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
    <>
      <FocusAwareStatusBar />
      <View
        className="w-full justify-between"
        style={{
          minHeight: 2,
        }}
      >
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
      </View>
    </>
  );
};
