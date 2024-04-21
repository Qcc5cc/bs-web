import axios from 'axios';
import React from 'react';

import { useAuth } from '@/core';
import { Env } from '@/core/env';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { setItem } from '@/core/storage';
import { FocusAwareStatusBar, showErrorMessage } from '@/ui';

import type { RegisterFormProps } from './register-form';
import { RegisterForm } from './register-form';
export const Register = () => {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: RegisterFormProps['onSubmit'] = (data) => {
    console.log(data);
    axios
      .post(Env.SERVER_URL + '/api/user/register', {
        username: data.name,
        password: data.password,
      })
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
    <>
      <FocusAwareStatusBar />
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
};
