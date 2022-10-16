import { useState } from 'react';

import { GruopCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';
import { FlatList } from 'react-native';

export function Groups() {
  const [groups, setGroups] = useState<Array<string>>(['Rocket']);

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
      />      
    </Container>
  );
}
