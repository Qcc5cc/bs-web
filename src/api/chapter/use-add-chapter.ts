import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { clientServer } from '../common';
import type { Chapter } from './types';

type Variables = {
  chapter_name: string;
};
type Response = Chapter;

export const useAddChapter = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    clientServer({
      url: 'api/chapter/add',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
