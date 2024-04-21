import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { clientServer } from '../common';
import type { CoursePost } from './types';

type Response = CoursePost[];
type Variables = { id: number }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useMyCourses = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'api/course/getMyCourses', // we recommend using  endpoint base url as primaryKey
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    return clientServer({
      url: primaryKey,
      method: 'get',
      params: {
        stuId: variables.id,
      },
    }).then((response) => response.data.data);
  },
});
