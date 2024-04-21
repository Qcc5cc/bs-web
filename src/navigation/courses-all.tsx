import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { CoursePost } from '@/api';
import { CourseInfo, Feed } from '@/screens';

export type CoursesStackParamList = {
  Feed: undefined;
  CourseInfo: { course: CoursePost };
};

const Stack = createNativeStackNavigator<CoursesStackParamList>();

export const CoursesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Feed"
          component={Feed}
        />
        <Stack.Screen
          name="CourseInfo"
          component={CourseInfo}
          options={{ title: '课程详情' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
