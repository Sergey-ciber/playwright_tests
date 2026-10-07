import { test as base } from '@playwright/test';
import { BoardsPage } from '../models/boardsPage';

type MyFixtures = {
  boardsPage: BoardsPage;
};

export const test = base.extend<MyFixtures>({
  boardsPage: async ({ page }, use) => {
    const boardsPage = new BoardsPage(page);
    await boardsPage.openBoardsPage();
    await use(boardsPage);
  },
});

export { expect } from '@playwright/test';
