import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { clientServer } from '../common';
import type { Chapter } from './types';

type Variables = {
  chapter_name: string;
};
type Response = Chapter;

export const useChangeChapter = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: async (variables) =>
      clientServer({
        url: 'api/chapter/update',
        method: 'POST',
        data: variables,
      }).then((response) => response.data),
  }
);
