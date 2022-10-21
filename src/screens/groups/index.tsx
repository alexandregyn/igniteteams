import { useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { GruopCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<Array<string>>([]);
  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate('new');
  }

  return (
    <Container>
      <Header />

      <Highlight title='Turmas' subtitle='Jogue com a sua turma'/>

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GruopCard title={item}/>
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?"/>
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />   
    </Container>
  );
}
