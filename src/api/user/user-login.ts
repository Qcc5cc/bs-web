import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { clientServer } from '../common';
import type { User } from './types';
type Response = {
  message: string;
  success: string;
  data: { id: string; username: string };
};
type Variables = User;

export const useLogin = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'login', // we recommend using  endpoint base url as primaryKey
  queryFn: ({ queryKey: [variables] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    return clientServer({
      url: 'api/user',
      method: 'POST',
      data: variables,
    }).then((response) => response.data);
  },
});
