import { userService } from "../services/user.service";

// Вместо глобальной переменной создаем утилиту, которая вернет нужные настройки

export const getProdRequestSettings = async function () {
  
  const userId = await userService.getId();
  
  return {
    headers: {
        'x-userId': userId,
    }
  }
}