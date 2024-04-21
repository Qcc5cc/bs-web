import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { clientServer } from '../common';
import type { Chapter } from './types';

type Response = Chapter[];
type Variables = { id: number }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useChapters = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'api/chapter/getChaptersByCourseId', // we recommend using  endpoint base url as primaryKey
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    return clientServer
      .get(`${primaryKey}?course_id=${variables.id}`)
      .then((response) => response.data.data);
  },
});
