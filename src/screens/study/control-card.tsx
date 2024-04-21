import React from 'react';

import type { CoursePost } from '@/api/courses/types';
import { Image, Text } from '@/ui';
import { Pressable } from '@/ui';

type Props = CoursePost & { onPress?: () => void };
// const bgColor = colors.warning[300];

export const ControlCard = ({
  course_name,
  imageUrl,
  onPress = () => {},
}: Props) => {
  return (
    <Pressable className="flex h-[200px] w-full flex-wrap  " onPress={onPress}>
      <Image
        className="h-[125px] w-[185px] place-content-center self-center "
        source={{
          uri: imageUrl
            ? 'data:image/png;base64,' + imageUrl
            : 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        }}
      />
      <Text className="font-mono text-lg tracking-wide">{course_name}</Text>
    </Pressable>
  );
};
