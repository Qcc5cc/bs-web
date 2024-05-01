import { Env } from '@env';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useSoftKeyboardEffect } from '@/core/keyboard';
import { getItem } from '@/core/storage';
import { Button, ControlledInput, showErrorMessage, Text, View } from '@/ui';

const schema = z.object({
  oldPassword: z.string().optional(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  id: z.any(),
});

export type FormType = z.infer<typeof schema>;

export type FormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const PasswordChange = () => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  useSoftKeyboardEffect();
  const onSubmit: FormProps['onSubmit'] = (data) => {
    data.id = getItem('userId');
    axios
      .post(Env.SERVER_URL + '/api/user/changePassword', data)
      .then(function (response) {
        console.log(response.data);
        console.log('cc');

        if (response.data.success) {
          showMessage({
            message: '修改成功',
            type: 'success',
          });
        } else showErrorMessage('原密码错误');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" variant="h1" className="pb-6 text-center">
        修改密码
      </Text>
      <ControlledInput
        testID="oldPassword"
        control={control}
        name="oldPassword"
        label="原密码"
      />
      <ControlledInput
        testID="password"
        control={control}
        name="password"
        label="新密码"
      />

      <Button
        testID="Register-button"
        label="提交"
        onPress={handleSubmit(onSubmit)}
        variant="secondary"
      />
    </View>
  );
};
