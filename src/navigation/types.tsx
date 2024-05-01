import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { AuthStackParamList } from './auth-navigator';
import type { FeedStackParamList } from './feed-navigator';
import type { SettingsStackParamList } from './settings-navigator';
import type { StyleStackParamList } from './style-navigator';

export type RootStackParamList = AuthStackParamList &
  FeedStackParamList &
  StyleStackParamList &
  SettingsStackParamList;
// StudyNavigatorStackParamList;
//  & FooStackParamList & BarStackParamList
// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;
