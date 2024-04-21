/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import Swiper from 'react-native-swiper';

import { type CoursePost, useSwiperCourses } from '@/api';
import { Image, Text, View } from '@/ui';

// const renderItem = (url: string) => (
//   <View>
//     <Image
//       className="h-[250px] w-full place-content-center self-center"
//       source={{
//         uri: url,
//       }}
//     />
//   </View>
// );

// const renderItem = ({ item }: ItemProps) => <Item item={item} />;
export const CourseSwiper = () => {
  const { data, isError, isLoading } = useSwiperCourses();
  const { navigate } = useNavigation();
  // const { swiperData, setSwiperData } = useState<string[]>();
  // // const { swiperData2, setSwiperData2 } = useState('');
  // // const { swiperData3, setSwiperData3 } = useState('');
  // // const { swiperData4, setSwiperData4 } = useState('');
  // // const { swiperData5, setSwiperData5 } = useState('');
  const renderItem = React.useCallback(
    (item: CoursePost) => (
      <Pressable
        key={item.id}
        onPress={() => {
          navigate('CourseInfo', { course: item });
        }}
      >
        <Image
          className="h-[250px] w-full place-content-center self-center"
          source={{
            uri: item.imageUrl
              ? 'data:image/png;base64,' + item.imageUrl
              : 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          }}
        />
      </Pressable>
    ),
    [navigate]
  );
  if (isError)
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  if (isLoading)
    return (
      <View>
        <Text> Loading </Text>
      </View>
    );
  return (
    <Swiper height={260} autoplay={true} showsButtons={true}>
      {data
        ? data.map((item: CoursePost) => {
            return renderItem(item);
            // {renderItem(item)}
            // <View key={item.id}>
            //   <Image
            //     className="h-[250px] w-full place-content-center self-center"
            //     source={{
            //       uri: item.imageUrl,
            //     }}
            //     onProgress={() => {
            //       console.log('cc');
            //       navigate('CourseInfo', { course: item });
            //     }}
            //     key={item.id}
            //   />
            // </View>
          })
        : ''}
      {/* <View>
        <Image
          className="h-[250px] w-full place-content-center self-center"
          source={{
            // uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            uri: data[0].imageUrl,
          }}
        />
      </View> */}
      {/* {renderItem(data[1])} */}
      {/* {renderItem(data ? data[2].imageUrl : '')}
      {renderItem(data ? data[3].imageUrl : '')} */}
    </Swiper>
  );
};
