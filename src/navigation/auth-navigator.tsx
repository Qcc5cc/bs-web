import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Login, Register } from '@/screens';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
