import { NextResponse } from 'next/server';

// 공휴일 라우트 핸들러
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') || new Date().getFullYear().toString();

  const BASE_URL = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService';
  const HOLIDAY_KEY = process.env.HOLIDAY_KEY;

  const url = `${BASE_URL}/getRestDeInfo?ServiceKey=${HOLIDAY_KEY}&solYear=${year}&_type=json&numOfRows=100`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
