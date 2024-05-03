/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useRoute } from '@react-navigation/native';
import { ResizeMode } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button as RNButton, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob';
import { z } from 'zod';

import { useChangeChapter } from '@/api';
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
  chapter_name: z.string().min(2),
  resourceUrl: z.any(),
  id: z.any(),
});

type FormType = z.infer<typeof schema>;

export const ChangeChapter = () => {
  const { params } = useRoute<RouteProp<'ChangeChapter'>>();
  const { control, handleSubmit } = useForm<FormType>({
    // resolver: zodResolver(schema),
  });
  const { mutate: changeChapter, isLoading } = useChangeChapter();
  const base_path = Env.SERVER_URL + '/api/course/getFileSrc' + '?path=';
  const [file, setFile] = React.useState(
    //base_path + 'D:/upload/video/184734-873923034_small.mp4'
    base_path + params.chapter.resourceUrl
  );
  const [updateFile, setUpdateFile] = React.useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    delete (result as any).cancelled;

    if (!result.canceled) {
      setFile(result.assets[0].uri);
      setUpdateFile(true);
      console.log(result.assets[0].uri);
    }
  };
  const onSubmit = (dataCourse: FormType) => {
    dataCourse.chapter_name = chapterName;
    dataCourse.id = params.chapter.id;
    dataCourse.resourceUrl = params.chapter.resourceUrl;
    if (chapterName === '') showErrorMessage('章节名不能为空');
    else {
      if (updateFile) {
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
            // 处理上传成功的响应
            dataCourse.resourceUrl = response.data;
            changeChapter(
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
                  showErrorMessage('Error adding course');
                },
              }
            );
            console.log(dataCourse);
          })
          .catch((error) => {
            // 处理上传失败的错误
            console.log('Upload error', error);
          });
      } else {
        changeChapter(
          { ...dataCourse },
          {
            onSuccess: () => {
              showMessage({
                message: 'Course change successfully',
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
      }
    }
  };
  const [chapterName, onChangeChapterName] = React.useState(
    params.chapter.chapter_name
  );

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
            value={chapterName}
            onChangeText={(text) => onChangeChapterName(text)}
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
              label="修改小节"
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
