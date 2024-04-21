import React from 'react';

import type { Chapter } from '@/api';
import { Pressable, Text } from '@/ui';

type Props = Chapter & { onPress?: () => void };

export const ChapterCube = ({
  id,
  chapter_name,
  onPress = () => {},
}: Props) => {
  return (
    <Pressable
      className="mr-4 ml-1 h-[80px] w-[130px]"
      onPress={onPress}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: '#DCDCDC',
        borderColor: '#87CEEB',
        borderWidth: 1,
        borderRadius: 5,
      }}
    >
      <Text className="font-sans text-base">`第{id++}节`</Text>
      <Text className="font-sans text-sm">{chapter_name}</Text>
    </Pressable>
  );
};
