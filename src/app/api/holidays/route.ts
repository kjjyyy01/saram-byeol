import ENV from '@/constants/env.constant';
import { NextResponse } from 'next/server';

// 공휴일 라우트 핸들러
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') || new Date().getFullYear().toString();

  const url = `${ENV.HOLIDAY_URL}/getRestDeInfo?ServiceKey=${ENV.HOLIDAY_KEY}&solYear=${year}&_type=json&numOfRows=100`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
