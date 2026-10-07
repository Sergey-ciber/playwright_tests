import { test, expect } from '@playwright/test';
import * as fs from 'node:fs';
import canbanoPaths from '../canbanoAuthPath.json';
import path from 'path';

type Board = {
  id: string;
  ownerId: string;
  role: number;
  name: string;
  members: string[];
};

const userJsonPath = path.join(__dirname, canbanoPaths.authFilePath);
const createdBoardsFilePath = path.join(__dirname, canbanoPaths.createdBoards);

// Читаем и парсим файл
const usersArray = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8')).cookies;
const access_token: string = usersArray.find((item: any) => item.name === 'access_token').value;

test('Мой тест', async ({ request }) => {
  console.log('Тип данных:', typeof usersArray);
  console.log('Содержимое:', usersArray);
});

test('Создание новой доски и сохранение результата в json', async ({ request }) => {
  // 1. Выполняем POST-запрос
  const response = await request.post('https://api.kanbano.ru/boards', {
    // Данные отправляются в поле 'data' (Playwright сам сериализует их в JSON)
    data: {
      name: 'Доска 3',
      order: 0,
    },
    // Если нужно, можно указать заголовки
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });

  // 2. Проверяем статус ответа (хорошая практика)
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

  // 5. Сохраняем данные в файл
  console.log(newBoard);
  let existingBoards: any[] = [];

  // 1. Проверяем, существует ли файл
  if (fs.existsSync(createdBoardsFilePath)) {
    // 2. Читаем старые данные
    const fileContent = fs.readFileSync(createdBoardsFilePath, 'utf-8');

    // Проверяем, не пустой ли файл, и пытаемся распарсить
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
  }

  // 3. Добавляем новые данные
  existingBoards.push(newBoard);

  // const createdBoards = JSON.parse(fs.readFileSync(createdBoardsFilePath, 'utf-8'));
  fs.writeFileSync(createdBoardsFilePath, JSON.stringify(existingBoards, null, 2));

  // Теперь эти данные можно использовать дальше в тесте
});
