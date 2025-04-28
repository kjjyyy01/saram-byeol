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
      throw new Error(`공휴일 API 응답 오류: ${res.statusText}`);
    }

    const data = await res.json();
    // 데이터 구조 검증
    if (!data.response || !data.response.body) {
      console.error('유효하지 않은 API 응답 형식:', data);
      return NextResponse.json({ error: '공휴일 데이터 형식이 올바르지 않습니다' }, { status: 500 });
    }
    return NextResponse.json(data); //정상 응답 반환
  } catch (error) {
    console.error('공휴일 데이터 호출 중 오류 발생:', error);
    return NextResponse.json({ error: '공휴일을 불러올 수 없습니다' }, { status: 500 });
  }
}
