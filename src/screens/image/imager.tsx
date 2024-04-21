/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { ResizeMode, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const Imager = () => {
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    delete (result as any).cancelled;
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);

      const cc = result.assets[0].uri.substring(
        0,
        result.assets[0].uri.lastIndexOf('/')
      );
      const name = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf('/') + 1
      );
      console.log(cc);
      console.log(name);

      RNFetchBlob.fetch(
        'POST',
        Env.SERVER_URL + '/api/chapter/add',
        {
          'Content-Type': 'multipart/form-data', // 请求头
        },
        [
          {
            name: 'file', // 文件字段名
            filename: name, // 文件名
            data: RNFetchBlob.wrap(result.assets[0].uri), // 文件路径
          },
        ]
      )
        .then((response) => {
          // 处理上传成功的响应
          console.log('Upload success', response);
        })
        .catch((error) => {
          // 处理上传失败的错误
          console.log('Upload error', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Video
          source={{ uri: image }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
