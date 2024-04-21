import React from 'react';

import { FocusAwareStatusBar, ScrollView, View } from '@/ui';

import { ButtonVariants } from './button-variants';
import { ColorVariants } from './color-variants';
import { CourseList } from './course-list';
import { CourseSwiper } from './course-swiper';
import { InputVariants } from './input-variants';
import { TextVariants } from './text-variants';

export const Style = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1  px-4 pt-10">
          {/* <ATry /> */}
          <CourseSwiper />
          <CourseList />
          <TextVariants />
          <ColorVariants />
          <InputVariants />
          <ButtonVariants />
        </View>
      </ScrollView>
    </>
  );
};
