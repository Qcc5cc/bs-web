import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Pressable, Text, View } from '@/ui';

const schema = z.object({
  name: z.string().optional(),
  // email: z
  //   .string({
  //     required_error: 'Email is required',
  //   })
  //   .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

const GoToRegister = () => {
  const { navigate } = useNavigation();
  return (
    <Pressable onPress={() => navigate('Register')} className="p-2">
      <Text className="text-center text-blue-600">创建账户</Text>
    </Pressable>
  );
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" variant="h1" className="pb-6 text-center">
        致行在线课堂
      </Text>

      <ControlledInput
        testID="name"
        control={control}
        name="name"
        label="账户"
      />

      {/* <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      /> */}
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="密码"
        placeholder="***"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="登录"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
      />
      {GoToRegister()}
    </View>
  );
};
