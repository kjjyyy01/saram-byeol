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
      throw new Error('유효하지 않은 공휴일 응답 형식');
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('공휴일 데이터 호출 중 오류 발생:', error);
    throw new Error('공휴일을 불러오는 중 문제가 발생했습니다.');
  }
}
