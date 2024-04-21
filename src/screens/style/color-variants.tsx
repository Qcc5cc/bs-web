import React from 'react';

import { Text, View } from '@/ui';
import colors from '@/ui/theme/colors';

import { Title } from './title';
type ColorName = keyof typeof colors; //[white、black、charcoal、neutral、primary、success、warning、danger]

//Variants --> change
// white:
//   black:
//   },
export const ColorVariants = () => {
  return (
    <>
      <Title text="Colors" />
      {(Object.keys(colors) as ColorName[]).map((name) => (
        <ColorVariant name={name} key={name} />
      ))}
    </>
  );
};
// Object.entries(colors[name]
// 50: '#F2F2F2',
// 100: '#E5E5E5',
// 200: '#C9C9C9',
// 300: '#B0B0B0',
// 400: '#969696',
// 500: '#7D7D7D',
// 600: '#616161',
// 700: '#474747',
// 800: '#383838',
// 850: '#2E2E2E',
// 900: '#1E1E1E',
// 950: '#121212',
const ColorVariant = ({ name }: { name: ColorName }) => {
  if (typeof colors[name] === 'string') return null;
  return (
    <View className="pt-2">
      <Text variant="md" className="font-medium">
        {name.toUpperCase()}
      </Text>
      <View className=" flex-row flex-wrap content-between  justify-between  ">
        {Object.entries(colors[name]).map(([key, value]) => {
          // console.log(`${colors[name]}`);
          // console.log(`${key}`);
          return (
            <ColorCard
              key={`${colors[name]}-${key}`}
              value={key}
              color={value}
            />
          );
        })}
      </View>
    </View>
  );
};

const ColorCard = ({ color, value }: { value: string; color: string }) => {
  return (
    <View className="flex-[1/5] items-center justify-center py-1">
      <View
        style={{ backgroundColor: color }}
        className={`h-[42px] w-[42px] items-center justify-center rounded-full  border-[1px] border-neutral-200 dark:border-charcoal-700`}
      >
        <Text variant="sm">{value}</Text>
      </View>
      <Text variant="sm">{color}</Text>
    </View>
  );
};
