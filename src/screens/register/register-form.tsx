import { Env } from '@env';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { setItem } from '@/core/storage';
import { Button, ControlledInput, showErrorMessage, Text, View } from '@/ui';

const schema = z.object({
  username: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  role: z.any(),
});

export type FormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const RegisterForm = () => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const [isChecked, setChecked] = useState(false);

  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: RegisterFormProps['onSubmit'] = (data) => {
    data.role = isChecked ? 1 : 0;
    console.log(data);
    axios
      .post(Env.SERVER_URL + '/api/user/register', data)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          signIn({ access: 'access-token', refresh: 'refresh-token' });
          setItem('role', response.data.data.role ? 'teacher' : 'student');
          setItem('userId', response.data.data.id);
        } else showErrorMessage('用户名已存在');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" variant="h1" className="pb-6 text-center">
        注册
      </Text>
      <ControlledInput
        testID="username"
        control={control}
        name="username"
        label="账户名称"
      />
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="密码"
        placeholder="***"
        secureTextEntry={true}
      />
      <Checkbox
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? '#8EE5EE' : undefined}
      />
      <Text className=" relative bottom-5 left-7 w-20">教师注册</Text>
      <Button
        testID="Register-button"
        label="注册"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
      />
    </View>
  );
};
