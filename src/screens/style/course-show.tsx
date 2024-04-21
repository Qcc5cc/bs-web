import React from 'react';

import type { CoursePost } from '@/api/courses/types';
import { Image, Text, View } from '@/ui';
import { Pressable } from '@/ui';

type Props = CoursePost & { onPress?: () => void };
// const bgColor = colors.warning[300];

export const CourseShow = ({
  course_name,
  school,
  teacher,
  imageUrl,
  onPress = () => {},
}: Props) => {
  return (
    <Pressable
      className="flex h-[200px] w-[220px] flex-wrap   self-center"
      onPress={onPress}
    >
      <Image
        className="h-[125px] w-[185px] place-content-center self-center "
        source={{
          uri: imageUrl
            ? 'data:image/png;base64,' + imageUrl
            : 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        }}
      />
      <View className="left-5">
        <Text className="font-mono text-lg tracking-wide">{course_name}</Text>
        <Text className="font-serif text-sm">{school}</Text>
        <Text className="font-serif text-sm">{teacher}</Text>
      </View>
    </Pressable>
  );
};
