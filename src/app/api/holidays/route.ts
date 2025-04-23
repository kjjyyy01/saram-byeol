import ENV from '@/constants/env.constant';
import { NextResponse } from 'next/server';

// 공휴일 라우트 핸들러
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') || new Date().getFullYear().toString();

  try {
    const url = `${ENV.HOLIDAY_URL}/getRestDeInfo?ServiceKey=${ENV.HOLIDAY_KEY}&solYear=${year}&_type=json&numOfRows=100`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error('공휴일 API 응답 오류:', res.statusText);
      return NextResponse.json({ error: '공휴일 정보를 가져오는 데 실패했습니다.' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('공휴일 데이터 호출 중 오류 발생:', error);
    return NextResponse.json({ error: '공휴일을 불러올 수 없습니다' }, { status: 500 });
  }
}
