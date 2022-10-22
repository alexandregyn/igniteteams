import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Nova Turma', 'Informe o nome da turma.');;
      }
      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Turma', error.message);
      } else {
        Alert.alert('Nova Turma', 'Não foi possível cadastra um nova Turma.');
        console.error(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight 
          title="Nova Turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input 
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button 
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}