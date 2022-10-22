import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerGetByGroup } from "@storage/player/playerGetByGroup";

type RouterParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const router = useRoute();
  const { group } = router.params as RouterParams;

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
    }

    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group);
      const players = await playerGetByGroup(group);
      console.log(players);      
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message);
      } else {
        Alert.alert('Nova Pessoa', 'Não foi possível incluir nova pessoa.');
        console.error(error);
      }
    }
  }

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          onChangeText={setNewPlayName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
      </Form>

      <HeaderList>
        <FlatList 
          horizontal
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />   

        <NumberOfPlayers>
          { players.length }
        </NumberOfPlayers>     
      </HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item}
            onRemove={() => {}}  
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time."/>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button 
        title="Remover Turma"
        type="SECUNDARY"
      />
    </Container>
  );
}