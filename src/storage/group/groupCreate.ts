import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const groupAlreadryExists = storedGroups.includes(newGroupName);
    if (groupAlreadryExists) {
      throw new AppError("Já existe uma turma cadastrado com esse nome.");
    }
    const storage = JSON.stringify([...storedGroups, newGroupName]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;    
  }  
}