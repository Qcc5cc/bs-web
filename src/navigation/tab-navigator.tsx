import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from 'nativewind';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';

import {
  colors,
  Feed as FeedIcon,
  Settings as SettingsIcon,
  Study as StudyIcon,
  Style as StyleIcon,
} from '@/ui';

import { CoursesNavigator } from './courses-all';
import { SettingsNavigator } from './settings-navigator';
import { StudyNavigator } from './study-navigator';
import { StyleNavigator } from './style-navigator';

type TabParamList = {
  StyleNavigator: undefined;
  StudyNavigator: undefined;
  // Settings: undefined;
  CoursesNavigator: undefined;
  SettingsNavigator: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabsIcons: TabIconsType = {
  StyleNavigator: (props: SvgProps) => <StyleIcon {...props} />,
  CoursesNavigator: (props: SvgProps) => <FeedIcon {...props} />,
  StudyNavigator: (props: SvgProps) => <StudyIcon {...props} />,
  SettingsNavigator: (props: SvgProps) => <SettingsIcon {...props} />,
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'StyleNavigator',
    component: StyleNavigator,
    label: '首页',
  },
  {
    name: 'CoursesNavigator',
    component: CoursesNavigator,
    label: '全部',
  },
  {
    name: 'StudyNavigator',
    component: StudyNavigator,
    label: '学习',
  },
  {
    name: 'SettingsNavigator',
    component: SettingsNavigator,
    label: '设置',
  },
];

type BarIconType = {
  name: keyof TabParamList;
  color: string;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  const Icon = tabsIcons[name];
  return <Icon color={color} {...reset} />;
};

export const TabNavigator = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor:
          colorScheme === 'dark' ? colors.charcoal[400] : colors.neutral[400],
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color }) => <BarIcon name={route.name} color={color} />,
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
                tabBarTestID: `${name}-tab`,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};
