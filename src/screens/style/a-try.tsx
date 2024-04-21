import * as React from 'react';

import { useAcc } from '@/api/acc/use-acc';
import { Text, View } from '@/ui';

// const fetchData = () => {
//   return fetch('http://172.20.10.5:8080/hello').then(async (response) => {
//     // 如果请求返回status不为200 则抛出后端错误
//     if (response.status !== 200) {
//       const { message } = await response.json();

//       throw new Error(message);
//     }

//     return response.text();
//   });
// };

function ProfileScreen() {
  // This hook returns `true` if the screen is focused, `false` otherwise
  // const { data, isLoading, isError } = usePosts();
  // if (isError) {
  //   return (
  //     <View>
  //       <Text> Error Loading data </Text>
  //     </View>
  //   );
  // }
  // return (
  //   // eslint-disable-next-line react-native/no-inline-styles
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Text>{data?.toString()}</Text>
  //   </View>
  // );
  // const zenQuery = useQuery(['hello'], fetchData); // ①
  // return (
  //   <View>
  //     <Text>"Zen from Github:"</Text>
  //     <Text>
  //       {' '}
  //       {zenQuery.isLoading || zenQuery.isFetching
  //         ? '加载中...'
  //         : zenQuery.isError
  //         ? zenQuery.isError
  //         : zenQuery.data}
  //     </Text>
  //   </View>
  // );
  const { data, isError } = useAcc();
  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <View>
      <Text>{data?.toString()}</Text>
    </View>
  );
}

export const ATry = () => {
  return <>{ProfileScreen()}</>;
};
