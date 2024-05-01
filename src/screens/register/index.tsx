import React from 'react';

import { FocusAwareStatusBar } from '@/ui';

import { RegisterForm } from './register-form';
export const Register = () => {
  return (
    <>
      <FocusAwareStatusBar />
      <RegisterForm />
    </>
  );
};
