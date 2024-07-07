import { http, HttpHandler, HttpResponse } from 'msw';

const generateId = () => Math.random().toString(36).slice(2, 9);

const board: { id: string; subject: string }[] = [];

export const handlers: HttpHandler[] = [
  http.get(`/board/:id`, ({ params }) => {
    console.log(params);
    const target = board.find((b) => b.id === params.id);
    return HttpResponse.json(target);
  }),
  http.post('/rolling/create', async ({ request }) => {
    const formData = (await request.json()) as {
      subject: string;
      theme: string;
    };
    const newBoard = {
      id: generateId(),
      subject: formData.subject,
      theme: formData.theme,
    };
    board.push(newBoard);
    return HttpResponse.json(newBoard);
  }),
];
