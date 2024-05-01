/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { useGet } from '@/api/user/user-get';
import { useAuth } from '@/core';
import { getItem } from '@/core/storage';
import { FocusAwareStatusBar, Image, ScrollView, Text, View } from '@/ui';

import { Item } from './item';
import { ItemsContainer } from './items-container';

export const Setting = () => {
  const { navigate } = useNavigation();

  const signOut = useAuth.use.signOut();
  const userId = getItem('userId') as number;
  const { data } = useGet({ variables: { id: userId } });
  return (
    <View>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-row pt-12 pl-5">
          <Image
            source={require('@/../assets/man.png')}
            className="self-left h-[150px] w-[150px] place-content-center "
          />
          <Text variant="h1" className="pl-7 pt-10">
            {data?.data.username}
          </Text>
        </View>
        <View className="flex-1 px-4 pt-9 ">
          {/* <Text variant="lg" className="font-bold">
            {translate('settings.title')}
          </Text>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer> */}

          <ItemsContainer title="信息">
            <Item text="修改密码" onPress={() => navigate('PasswordChange')} />
            <Item text="完善信息" onPress={() => navigate('UserInformation')} />
          </ItemsContainer>

          <ItemsContainer title="关于">
            <Item text="App名称" value={'致行在线课堂'} />
            <Item text="版本" value={'0.0.1'} />
          </ItemsContainer>

          {/* <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer> */}

          <View className="my-8">
            <ItemsContainer>
              <Item text="退出当前账号" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
