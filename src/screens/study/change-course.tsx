/* eslint-disable max-lines-per-function */
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button as RNButton, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob';
import { z } from 'zod';

import { useChangeCourse } from '@/api/courses/use-change-courses';
import type { RouteProp } from '@/navigation/types';
import {
  Button,
  ControlledInput,
  Image,
  showErrorMessage,
  Text,
  View,
} from '@/ui';

const schema = z.object({
  course_name: z.string().min(2),
  teacher: z.string().min(2),
  school: z.string().min(2),
  introduction: z.string().min(10),
  imageUrl: z.any(),
  id: z.any(),
  type: z.any(),
});

type FormType = z.infer<typeof schema>;

export const ChangeCourse = () => {
  const { params } = useRoute<RouteProp<'ChangeCourse'>>();
  const { control, handleSubmit } = useForm<FormType>({
    // resolver: zodResolver(schema),
  });
  const [file, setFile] = useState<any>(params.course.imageUrl);
  const { mutate: changeCourse, isLoading } = useChangeCourse();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    delete (result as any).cancelled;
    console.log(result);

    if (!result.canceled) {
      RNFetchBlob.fs
        .readFile(result.assets[0].uri, 'base64')
        .then((dataCourse) => {
          console.log(dataCourse.length);
          setFile(dataCourse);
        });
    }
  };
  const onSubmit = (dataCourse: FormType) => {
    dataCourse.course_name = course_name;
    dataCourse.teacher = teacher;
    dataCourse.school = school;
    dataCourse.introduction = introduction;
    dataCourse.id = params.course.id;
    dataCourse.type = selected;
    console.log('cc');
    if (file) dataCourse.imageUrl = file;
    changeCourse(
      { ...dataCourse },
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
  const [course_name, onChangeCourseName] = React.useState(
    params.course.course_name
  );
  const [teacher, onChangeTeacher] = React.useState(params.course.teacher);
  const [school, onChangeSchool] = React.useState(params.course.school);
  const [introduction, onChangeIntroduction] = React.useState(
    params.course.introduction
  );
  const [selected, setSelected] = useState(params.course.type);
  return (
    <ScrollView>
      <View className="flex-1 p-4 ">
        <ControlledInput
          name="course_name"
          label="课程名称"
          control={control}
          testID="courseName"
          value={course_name}
          onChangeText={(text) => onChangeCourseName(text)}
        />
        <Image
          source={{
            uri: file
              ? 'data:image/png;base64,' + file
              : 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          }}
          className="h-[90px] w-[160px] self-center"
        />
        <RNButton title="上传封面" onPress={pickImage} />

        <ControlledInput
          name="teacher"
          label="教师名称"
          control={control}
          multiline
          value={teacher}
          onChangeText={(text) => onChangeTeacher(text)}
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
          label="课程介绍"
          control={control}
          multiline
          value={introduction}
          onChangeText={(text) => onChangeIntroduction(text)}
        />
        <Text>课程类型</Text>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
        >
          <Picker.Item label="计算机" value="计算机" />
          <Picker.Item label="历史" value="历史" />
          <Picker.Item label="理学" value="理学" />
          <Picker.Item label="经济学" value="经济学" />
          <Picker.Item label="其他" value="其他" />
        </Picker>
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
