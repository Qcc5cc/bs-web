import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { clientServer } from '../common';

type Variables = {
  username: string;
  school: string;
  email: string;
  introduction: string;
};
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
export const useChangeInfo = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    clientServer({
      url: 'api/user/changeInfo',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
