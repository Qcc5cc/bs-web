import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Chapter, CoursePost } from '@/api';
import { CourseInfo, Style } from '@/screens';
export type StyleStackParamList = {
  Stylee: undefined;
  CourseInfo: { course: CoursePost };
  ControlInfo: { course: CoursePost };
  ChangeCourse: { course: CoursePost };
  AddChapter: { id: number };
  ControlChapter: { id: number };
  ChangeChapter: { chapter: Chapter };
};

const Stack = createNativeStackNavigator<StyleStackParamList>();

export const StyleNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Stylee"
          component={Style}
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
