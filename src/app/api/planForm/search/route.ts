import ENV from '@/constants/env.constant';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  //url에서 쿼리 파라미터 추출 = 검색어
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  //검색어가 없을 경우 에러메시지 반환
  if (!query) {
    return NextResponse.json({ error: '검색어를 입력해주세요' }, { status: 400 });
  }

  //경로와 검색어를 조합하여 데이터 요청
  //encodeURIComponent(query)는 혹시 있을 수 있는 한글/특수문자를 안전하게 인코딩
  try {
    const res = await fetch(`${ENV.KAKAO_URL}${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `KakaoAK ${ENV.KAKAO_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    //응답값이 없을 경우
    if (!res.ok) {
      return new Response('데이터를 불러오는데 실패했습니다.', {
        status: res.status,
      });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Kakao API 호출 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
