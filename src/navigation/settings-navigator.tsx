import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { PasswordChange, Setting, UserInformation } from '@/screens';
export type SettingsStackParamList = {
  Setting: undefined;
  PasswordChange: undefined;
  UserInformation: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Setting"
          component={Setting}
        />
        <Stack.Screen
          name="PasswordChange"
          component={PasswordChange}
          options={{ title: '修改密码' }}
        />
        <Stack.Screen
          name="UserInformation"
          component={UserInformation}
          options={{ title: '信息完善' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
