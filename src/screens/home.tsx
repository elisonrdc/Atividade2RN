import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IUser {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
}

interface IOwner {
  login: string;
  avatar_url: string;
  url: string;
  followers_url: string;
}

interface IData {
  id: string;
  name: string;
  owner: IOwner;
  url: string;
  language: string;
  visibility: string;
}

const Home = ({navigation}:any) => {

  const [user, setUser] = useState<IUser>();
  const [listRpos, setListRepos] = useState<IData[]>([]);

  const URL = 'https://api.github.com';
  useEffect(() => {
    fetch(`${URL}/user`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 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',
      },
    }).then(response => response.json())
      .then(json => {
        setUser(json);
      })
      .catch(e => {
        console.log(`Erro: ${e}`);
      });
  });

  useEffect(() => {
    fetch(`${URL}/user/repos`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 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',
      },
    })
      .then(response => response.json())
      .then(json => {
        setListRepos(json);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
      <View style={styles.imageView}>
        { user?.avatar_url !== undefined ? <Image source={{uri: user?.avatar_url}} style={styles.image} /> : null }
        <Text style={{fontSize: 24}}>{user?.name+' ('+user?.login+')'}</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{user?.bio}</Text>
      </View>
      <View style={{padding: 8}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Repositórios</Text>
      </View>
      <FlatList
        data={listRpos}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => { navigation.navigate('Details', {
              followers_url: item.owner.followers_url,
              login: item.owner.login
            }) }}
          >
            <View
              key={index}
              style={{backgroundColor: '#FFF', marginTop: 8, padding: 8}}>
              <Text>{item.name}</Text>
              <Text>{item.language || 'Linguagem não encontrada'}</Text>
              <Text>{item.owner.login}</Text>
              <Text style={{color: item.visibility == 'private' ? 'red' : 'blue'}}>{item.visibility}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<ActivityIndicator size={'large'} color={'red'} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageView: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: 'grey',
    borderRadius: 60,
    alignSelf: 'center',
  },
});

export default Home;
