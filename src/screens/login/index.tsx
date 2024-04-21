import { Env } from '@env';
import axios from 'axios';
import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { getItem, setItem } from '@/core/storage';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

// type Response = {
//   message: string;
//   success: string;
//   data: { id: string; username: string };
// };

export const Login = () => {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const onSubmit: LoginFormProps['onSubmit'] = (data1) => {
    // let result: Response = clientServer({
    //   url: 'api/user',
    //   method: 'POST',
    //   data: data,
    // }).then((response) => response.data.success);
    // console.log(data);
    // if (result.success) {
    // }
    console.log(data1);
    //signIn({ access: 'access-token', refresh: 'refresh-token' });
    axios
      .post(Env.SERVER_URL + '/api/user/login', {
        username: data1.name,
        password: data1.password,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          signIn({ access: 'access-token', refresh: 'refresh-token' });
          setItem('role', response.data.data.role ? 'teacher' : 'student');
          setItem('userId', response.data.data.id);
          console.log(getItem('role'));
          console.log(response.data);
        } else showErrorMessage('用户名或密码错误');
        // showMessage({
        //   message: '用户名或密码错误',
        //   type: 'default',
        // });
        // here
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};
