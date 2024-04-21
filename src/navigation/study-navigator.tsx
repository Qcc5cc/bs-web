import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Chapter, CoursePost } from '@/api';
import {
  AddChapter,
  ChangeChapter,
  ChangeCourse,
  ControlChapter,
  ControlInfo,
  CourseInfo,
} from '@/screens';

import { MyCourseNavigator } from './mycourse-navigator';

export type StudyNavigatorStackParamList = {
  MyCourseNavigator: undefined;
  CourseInfo: { course: CoursePost };
  ControlInfo: { course: CoursePost };
  ChangeCourse: { course: CoursePost };
  AddChapter: { id: number };
  ControlChapter: { id: number };
  ChangeChapter: { chapter: Chapter };
};

const Stack = createNativeStackNavigator<StudyNavigatorStackParamList>();

export const StudyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MyCourseNavigator"
          component={MyCourseNavigator}
        />
        <Stack.Screen
          name="CourseInfo"
          component={CourseInfo}
          options={{ title: '课程详情' }}
        />
        <Stack.Screen
          name="ControlInfo"
          component={ControlInfo}
          options={{ title: '课程详情' }}
        />
        <Stack.Screen
          name="ChangeCourse"
          component={ChangeCourse}
          options={{ title: '修改' }}
        />
        <Stack.Screen
          name="AddChapter"
          component={AddChapter}
          options={{ title: '添加' }}
        />
        <Stack.Screen
          name="ControlChapter"
          component={ControlChapter}
          options={{ title: '章节管理' }}
        />
        <Stack.Screen
          name="ChangeChapter"
          component={ChangeChapter}
          options={{ title: '章节修改' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
