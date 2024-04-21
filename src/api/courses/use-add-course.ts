import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { clientServer } from '../common';
import type { CoursePost } from './types';

type Variables = {
  course_name: string;
  school: string;
  teacher: string;
  introduction: string;
};
type Response = CoursePost;

export const useAddCourse = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    clientServer({
      url: 'api/course/add',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
