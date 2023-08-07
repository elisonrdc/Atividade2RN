import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

interface IData {
  id: string;
  login: string;
  avatar_url: string;
}

const Details = ({route}:any) => {

  const [listFollowers, setListFollowers] = useState<IData[]>([]);

  const URL = 'https://api.github.com';
  useEffect(() => {
    fetch(`${route.params.followers_url}`, {
      method: 'GET'
    }).then(
      response => response.json()
    ).then(json => {
        setListFollowers(json);
      }
    );
  }, []);

  return (
    <View>
      <SafeAreaView>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, width: "100%", backgroundColor: "rgba(214,214,214,0.59)" }} />
          )}
          data={listFollowers}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{uri: item.avatar_url}} />
              <View style={styles.content}>
                <Text style={styles.title}>{item.login}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={{textAlign:"center", padding: 10, fontSize: 16}}>Nenhum seguidor encontrado</Text>}
          ListHeaderComponent={
            <View style={{padding: 8}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{'Seguidores ('+route.params.login+')'}</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#000",
  },
});

export default Details;
