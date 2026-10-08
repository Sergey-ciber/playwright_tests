import path from 'path';
import canbanoPaths from '../canbanoAuthPath.json';
import { expect, request, test } from '@playwright/test';
import { ROUTES } from '../src/constants/routes';
import * as fs from 'node:fs';
import { PATHS } from '../src/config/path';

type Board = {
  id: string;
  ownerId: string;
  role: number;
  name: string;
  members: string[];
};

export class BoardsBackend {
  readonly board: Board;
  readonly userJsonPath: string;
  readonly createdBoardsFilePath: string;
  readonly accessToken: string;

  constructor() {
    this.userJsonPath = path.join(__dirname, canbanoPaths.authFilePath);
    this.createdBoardsFilePath = path.join(__dirname, canbanoPaths.createdBoards);
    this.accessToken = JSON.parse(fs.readFileSync(PATHS.AUTH, 'utf-8')).cookies.find(
      (e: any) => e.name === 'access_token'
    ).value;
  }

  // Создание новой доски и сохранение результата в json
  async createNewBoard(request: any) {
    await test.step('Создание новой доски и сохранение результата в json', async ({}) => {
      const response = await request.post(`${ROUTES.API_BASE}${ROUTES.API.BOARDS}`, {
        // Данные отправляются в поле 'data' (Playwright сам сериализует их в JSON)
        data: {
          name: 'Доска 8',
          order: 0,
        },
        // Если нужно, можно указать заголовки
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      // 2. Проверяем статус ответа
      expect(response.ok()).toBeTruthy(); // Проверяет, что статус 200-299

      // 3. Парсим тело ответа (если сервер вернул JSON)
      const responseBody = await response.json();

      // 4. Сохраняем нужные данные в переменные
      const newBoard: Board = {
        id: responseBody.id,
        ownerId: responseBody.ownerId,
        role: responseBody.role,
        name: responseBody.name,
        members: responseBody.members,
      };

      // Выводим в консоль получившийся объект board
      console.log(newBoard);

      // 6. Проверяем, существует ли файл
      if (fs.existsSync(PATHS.CREATED_BOARDS)) {
        //  Читаем старые данные
        const fileContent = fs.readFileSync(PATHS.CREATED_BOARDS, 'utf-8');

        // Проверяем, не пустой ли файл, и пытаемся распарсить
        let existingBoards: any[];
        if (fileContent.trim() !== '') {
          try {
            existingBoards = JSON.parse(fileContent);

            // Если в файле лежит не массив (например, один объект), оборачиваем его в массив
            if (!Array.isArray(existingBoards)) {
              existingBoards = [existingBoards];
            }
          } catch (e) {
            console.warn('Ошибка парсинга JSON, создаем новый массив');
            existingBoards = [];
          }
        }
        // 7. Добавляем новые данные
        existingBoards.push(newBoard);

        // 8. Записываем данные в файл
        fs.writeFileSync(PATHS.CREATED_BOARDS, JSON.stringify(existingBoards, null, 2));
      }
    });
  }
}
