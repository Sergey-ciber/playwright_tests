export const ROUTES = {
  // UI Routes
  LOGIN: '/login',
  BOARDS: '/boards',
  BOARD_DETAILS: (id: string) => `/boards/${id}`,

  // API живёт на отдельном поддомене и отдаёт JSON;
  // app.kanbano.ru — это SPA, отдаёт HTML. Переопределяется через переменную окружения.
  API_BASE: process.env.API_BASE ?? 'https://api.kanbano.ru',

  // API Routes
  API: {
    BOARDS: '/boards',
    BOARD_BY_ID: (id: string) => `/api/boards/${id}`,
    USERS: '/api/users',
  },
};
