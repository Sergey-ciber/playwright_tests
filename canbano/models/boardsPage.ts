import { expect, Locator, Page, test } from '@playwright/test';

interface Elements {
  name: string;
  text?: string;
  locator: (page: Page) => Locator;
}

export class BoardsPage {
  readonly page: Page;
  readonly elements: Elements[];
  readonly url: string = 'https://app.kanbano.ru/boards';

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      { name: 'Доски', text: 'Доски', locator: (page): Locator => page.getByRole('link', { name: 'Доски' }) },
      {
        name: 'Канбано',
        text: 'Канбано',
        locator: (page): Locator => page.getByText('Канбано'),
      },
      {
        name: 'Кнопка Больше возможностей',
        text: 'Больше возможностей',
        locator: (page): Locator => page.getByRole('button', { name: 'Больше возможностей' }),
      },
      {
        name: 'Кнопка Все',
        text: 'Все',
        locator: (page): Locator => page.getByText('Все'),
      },
      {
        name: 'Кнопка Избранные',
        text: 'Избранные',
        locator: (page): Locator => page.getByText('Избранные'),
      },
      {
        name: 'Кнопка Доступные',
        text: 'Доступные',
        locator: (page): Locator => page.getByText('Доступные'),
      },

      {
        name: 'Кнопка Архив',
        locator: (page): Locator =>
          page.locator(
            '#app > div > div.grow.overflow-y-hidden.sm\\:rounded-\\[24px\\] > div > div:nth-child(1) > div > div.w-full.flex.items-center.px-\\[8px\\].sm\\:px-\\[16px\\] > div.grow.flex.items-center.gap-\\[8px\\].sm\\:gap-\\[12px\\] > button'
          ),
      },
      {
        name: 'Поле ввода для поиска по доскам',
        text: 'Поиск по доскам',
        locator: (page): Locator => page.getByRole('textbox', { name: 'Поиск по доскам' }),
      },
      {
        name: 'Поле ввода для записи идеи в новой доске',
        text: 'Поиск по доскам',
        locator: (page): Locator => page.getByRole('textbox', { name: 'Запиши свои идеи в новой доске' }),
      },
      {
        name: 'Выпадающий список для выбора шаблона',
        text: 'Без шаблона',
        locator: (page): Locator => page.getByRole('button', { name: 'Без шаблона' }),
      },
      {
        name: 'Кнопка Создать доску',
        text: 'Создать доску',
        locator: (page): Locator =>
          page.locator(
            '#app > div > div.grow.overflow-y-hidden.sm\\:rounded-\\[24px\\] > div > div:nth-child(1) > div > div.px-\\[8px\\].sm\\:px-\\[16px\\].flex.items-center.gap-\\[6px\\].sm\\:gap-\\[12px\\] > div > button.w-fit.flex.items-center.justify-center.transition-all.cursor-pointer.select-none.disabled\\:cursor-not-allowed.bg-\\[\\#d76422\\].text-\\[\\#ffffff\\].border-transparent.hover\\:not-disabled\\:bg-\\[\\#df834e\\].disabled\\:bg-\\[\\#efc1a7\\].disabled\\:text-\\[\\#fbf0e9\\].h-\\[44px\\].gap-\\[6px\\].rounded-\\[10px\\].text-\\[14px\\].font-medium.px-\\[16px\\].py-\\[14px\\].hidden.sm\\:flex'
          ),
      },
    ];
  }

  async openBoardsPage() {
    await test.step('Открытие страницы boards', async (page) => {
      await this.page.goto(this.url);
    });

    await test.step('Проверка отображения ссылки "Доски" на странице boards', async () => {
      await expect(this.elements.find((e) => e.name === 'Доски').locator(this.page)).toBeVisible();
    });
  }

  async checkVisibleElements() {
    await test.step('проверка видимости основных элементов на странице', async () => {
      for (const element of this.elements) {
        await test.step(`Проверка видимости элемента ${element.name}`, async () => {
          await expect(element.locator(this.page)).toBeVisible();
        });
      }
    });
  }


}
