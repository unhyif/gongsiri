import houseList from '@data/houseList.json';

export function GET() {
  return Response.json(houseList);
}
