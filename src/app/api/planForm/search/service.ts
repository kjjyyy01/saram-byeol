// 장소검색 함수 작성 
export const searchPlaces = async (keyword: string) => {
  const res = await fetch(`/api/planForm/search?query=${keyword}`);
  const data = await res.json();
  return data;
};
