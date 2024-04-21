import React from 'react';

import { Text, View } from '@/ui';
import colors from '@/ui/theme/colors';

export const msg: string = 'cccc';
export const NativeWild = () => {
  return (
    <View
      className="bg-dark h-5"
      style={{ backgroundColor: colors.charcoal[100] }}
    >
      <Text className="text-bold">{msg}</Text>
    </View>
  );
};
