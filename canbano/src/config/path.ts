import path from 'path';

// Приводим к абсолютным путям от корня проекта
export const PATHS = {
  AUTH: path.join(__dirname, '../../playwright/.auth/user.json'),
  CREATED_BOARDS: path.join(__dirname, '../../boardsData/createdBoards.json'),
};
