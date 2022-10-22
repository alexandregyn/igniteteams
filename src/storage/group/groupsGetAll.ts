import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
    const groups: Array<String> = storage ? JSON.parse(storage) : [];
    return groups;
  } catch (error) {
    throw error;    
  }  
}