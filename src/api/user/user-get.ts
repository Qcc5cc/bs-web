import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { clientServer } from '../common';
type Response = {
  message: string;
  success: string;
  data: {
    id: string;
    username: string;
    email: string;
    school: string;
    introduction: string;
  };
};
type Variables = { id: number };

export const useGet = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'api/user/getById', // we recommend using  endpoint base url as primaryKey
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    return clientServer({
      url: primaryKey,
      method: 'GET',
      params: { id: variables.id },
    }).then((response) => response.data);
  },
});
