// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as React from 'react';

import { getItem } from '@/core/storage';
import { MyCourses } from '@/screens';
import { Control } from '@/screens';
import { AddCourse } from '@/screens';

export type MyCourseParamList = {
  MyCourses: undefined;
  Control: undefined;
  AddCourse: undefined;
  Imager: undefined;
};

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

const Tab = createMaterialTopTabNavigator();

export const MyCourseNavigator = () => {
  return getItem('role') === 'student' ? (
    <Tab.Navigator>
      <Tab.Screen name="我的课程" component={MyCourses} />
      {/* <Tab.Screen name="Imager" component={Imager} /> */}
    </Tab.Navigator>
  ) : (
    <Tab.Navigator>
      <Tab.Screen name="我的课程" component={MyCourses} />
      <Tab.Screen name="管理" component={Control} />
      <Tab.Screen name="添加课程" component={AddCourse} />
      {/* <Tab.Screen name="Imager" component={Imager} /> */}
    </Tab.Navigator>
  );
};
