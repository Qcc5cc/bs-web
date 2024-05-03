/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { ResizeMode } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button as RNButton, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob';
import { z } from 'zod';

import { useAddChapter } from '@/api';
import type { RouteProp } from '@/navigation/types';
import {
  Button,
  ControlledInput,
  FocusAwareStatusBar,
  showErrorMessage,
  Video,
  View,
} from '@/ui';

const schema = z.object({
  chapter_name: z.string({ required_error: '请输入章节名称' }),
  resourceUrl: z.any(),
  course_id: z.any(),
});

type FormType = z.infer<typeof schema>;

export const AddChapter = () => {
  const { params } = useRoute<RouteProp<'AddChapter'>>();
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const [file, setFile] = useState<any>(null);
  const { mutate: addChapter, isLoading } = useAddChapter();

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
      setFile(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };
  const onSubmit = (dataCourse: FormType) => {
    if (file === null) showErrorMessage('请上传视频');
    else {
      dataCourse.course_id = params.id;
      console.log(dataCourse);
      const name = file.substring(file.lastIndexOf('/') + 1);
      RNFetchBlob.fetch(
        'POST',
        Env.SERVER_URL + '/api/chapter/addFile',
        {
          'Content-Type': 'multipart/form-data', // 请求头
        },
        [
          {
            name: 'file', // 文件字段名
            filename: name, // 文件名
            data: RNFetchBlob.wrap(file), // 文件路径
          },
        ]
      )
        .then((response) => {
          console.log('cc');

          // 处理上传成功的响应
          dataCourse.resourceUrl = response.data;
          addChapter(
            { ...dataCourse },
            {
              onSuccess: () => {
                showMessage({
                  message: '添加成功',
                  type: 'success',
                });
                // here you can navigate to the post list and refresh the list data
                //queryClient.invalidateQueries(usePosts.getKey());
              },
              onError: () => {
                showErrorMessage('添加失败');
              },
            }
          );
          console.log(dataCourse);
        })
        .catch((error) => {
          // 处理上传失败的错误
          console.log('Upload error', error);
        });
    }
  };
  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1  px-4 pt-5">
        <ScrollView>
          <ControlledInput
            name="chapter_name"
            label="小节名称"
            control={control}
            testID="chapter_name"
          />
          <View className="pt-10">
            <RNButton title="上传视频" onPress={pickImage} />
            {file && (
              <Video
                source={{ uri: file }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  alignSelf: 'center',
                  width: 320 * 1.3,
                  height: 200 * 1.3,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            )}
          </View>
          <View className="pt-10">
            <Button
              label="添加小节"
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              variant="secondary"
              testID="add-course-button"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
