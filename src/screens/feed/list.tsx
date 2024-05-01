import React from 'react';

import { FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';

import { CourseAll } from '../style/course-all';

export const Feed = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1  px-4 pt-10">
          <Text>全部课程</Text>
          <CourseAll />
        </View>
      </ScrollView>
    </>
  );
};
