/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useChangeInfo } from '@/api/user/use-change-info';
import { useGet } from '@/api/user/user-get';
import { getItem } from '@/core/storage';
import {
  Button,
  ControlledInput,
  ScrollView,
  showErrorMessage,
  View,
} from '@/ui';

const schema = z.object({
  username: z.string(),
  email: z.string(),
  school: z.string(),
  introduction: z.string(),
  id: z.any(),
});

type FormType = z.infer<typeof schema>;

export const UserInformation = () => {
  const userId = getItem('userId') as number;
  const { data } = useGet({ variables: { id: userId } });
  const { mutate: changeInfo, isLoading } = useChangeInfo();

  const { control, handleSubmit } = useForm<FormType>({
    // resolver: zodResolver(schema),
  });
  const [username, onChangeCourseName] = React.useState(data?.data.username);
  const [email, onChangeEmail] = React.useState(data?.data.email);
  const [school, onChangeSchool] = React.useState(data?.data.school);
  const [introduction, onChangeIntroduction] = React.useState(
    data?.data.introduction
  );
  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(Env.SERVER_URL + '/api/user/getById', {
          params: { id: userId },
        })
        .then((response) => {
          console.log(response.data.data);
          onChangeCourseName(response.data.data.username);
          onChangeEmail(response.data.data.email);
          onChangeSchool(response.data.data.school);
          onChangeIntroduction(response.data.data.introduction);
        });
    }, [userId])
  );
  const onSubmit = (info: FormType) => {
    info.username = username as string;
    info.email = email as string;
    info.school = school as string;
    info.introduction = introduction as string;
    info.id = userId;
    changeInfo(
      { ...info },
      {
        onSuccess: () => {
          showMessage({
            message: '修改成功',
            type: 'success',
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('修改失败');
        },
      }
    );
  };

  return (
    <ScrollView>
      <View className="flex-1 p-4 ">
        <ControlledInput
          name="username"
          label="用户名"
          control={control}
          testID="courseName"
          value={username}
          onChangeText={(text) => onChangeCourseName(text)}
        />

        <ControlledInput
          name="email"
          label="邮箱"
          control={control}
          multiline
          value={email}
          onChangeText={(text) => onChangeEmail(text)}
        />
        <ControlledInput
          name="school"
          label="学校"
          control={control}
          multiline
          value={school}
          onChangeText={(text) => onChangeSchool(text)}
        />
        <ControlledInput
          name="introduction"
          label="介绍"
          control={control}
          multiline
          value={introduction}
          onChangeText={(text) => onChangeIntroduction(text)}
        />
        <Button
          label="提交"
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          variant="secondary"
          testID="add-course-button"
        />
      </View>
    </ScrollView>
  );
};
