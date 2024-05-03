/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button as RNButton, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob';
import { z } from 'zod';

import { useAddCourse } from '@/api';
import { getItem } from '@/core/storage';
import {
  Button,
  ControlledInput,
  Image,
  showErrorMessage,
  Text,
  View,
} from '@/ui';

const schema = z.object({
  course_name: z
    .string({ required_error: '请输入课程名称' })
    .min(2, { message: '课程名称不得少于两个字符' }),
  teacher: z
    .string({ required_error: '请输入教师名称' })
    .min(2, { message: '教师名称不得少于两个字符' }),
  school: z
    .string({ required_error: '请输入学习名称' })
    .min(2, { message: '学校名称不得少于两个字符' }),
  introduction: z
    .string({ required_error: '请输入课程介绍' })
    .min(2, { message: '课程介绍不得少于10个字' }),
  imageUrl: z.any(),
  teacher_id: z.any(),
  type: z.any(),
});

type FormType = z.infer<typeof schema>;

export const AddCourse = () => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const [image, setImage] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const { mutate: addCourse, isLoading } = useAddCourse();

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
      setImage(result.assets[0].uri);
      RNFetchBlob.fs
        .readFile(result.assets[0].uri, 'base64')
        .then((dataCourse) => {
          console.log(dataCourse.length);
          setFile(dataCourse);
        });
    }
  };
  const onSubmit = (dataCourse: FormType) => {
    console.log('cc');
    dataCourse.teacher_id = getItem('userId');
    dataCourse.type = selected;
    if (file) dataCourse.imageUrl = file;
    // console.log(dataCourse);
    addCourse(
      { ...dataCourse },
      {
        onSuccess: () => {
          showMessage({
            message: 'Course added successfully',
            type: 'success',
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('Error adding course');
        },
      }
    );
  };

  const [selected, setSelected] = useState();
  return (
    <ScrollView>
      <View className="flex-1 p-4 ">
        <ControlledInput
          name="course_name"
          label="课程名称"
          control={control}
          testID="courseName"
        />
        {image && (
          <Image
            source={{ uri: image }}
            className="h-[90px] w-[160px] self-center"
          />
        )}
        <RNButton title="上传封面 " onPress={pickImage} />

        <ControlledInput
          name="teacher"
          label="教师名称"
          control={control}
          multiline
          testID="teacher-input"
        />
        <ControlledInput
          name="school"
          label="学校名称"
          control={control}
          multiline
          testID="school-input"
        />
        <ControlledInput
          name="introduction"
          label="课程介绍"
          control={control}
          multiline
          testID="introduction-input"
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
          label="添加课程"
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          variant="secondary"
          testID="add-course-button"
        />
      </View>
    </ScrollView>
  );
};
