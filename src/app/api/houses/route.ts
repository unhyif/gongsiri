import { House } from '@/types/index';

export async function GET() {
  const result: House[] = [];
  return Response.json({ data: result, updatedAt: Date.now() });
}
