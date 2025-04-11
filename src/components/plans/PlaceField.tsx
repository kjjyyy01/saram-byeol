import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { searchPlaces } from '@/app/api/planForm/search/service';
import { SelectItem } from '@radix-ui/react-select';
import { KakaoPlaceType } from '@/types/plans';

interface PlaceFieldProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}
const PlaceField = ({ inputValue, setInputValue }: PlaceFieldProps) => {
  const [open, setOpen] = useState(false);
  const [placeList, setPlaceList] = useState<KakaoPlaceType[]>([]);
  const { control, setValue } = useFormContext();

  const searchHandler = async (e: React.MouseEvent, keyword: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!keyword.trim()) return;
    try {
      const documents = await searchPlaces(keyword);
      setPlaceList(documents);
      setOpen(true);
    } catch (error) {
      console.error('검색 실패', error);
    }
  };

  return (
    <FormField
      control={control}
      name='location'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>장소검색</FormLabel>
            {!open ? (
              <>
                <Input
                  type='text'
                  placeholder='장소검색'
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <Button onClick={(e) => searchHandler(e, inputValue)} type='button'>
                  검색
                </Button>
              </>
            ) : (
              <Select
                open={true}
                value={field.value}
                onValueChange={(value) => {
                  // JSON 문자열로 serialize하여 SelectItem value로 사용
                  const selected: KakaoPlaceType = JSON.parse(value);
                  setInputValue(selected?.place_name); //인풋창에 선택한 밸류의 이름 노출
                  setValue('location', selected); // form에 값 저장
                  setOpen(false);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {placeList.length !== 0 ? (
                    placeList.map((place) => {
                      return (
                        <SelectItem key={place.id} value={JSON.stringify(place)}>
                          {place.place_name}
                          <div>{place.road_address_name}</div>
                        </SelectItem>
                      );
                    })
                  ) : (
                    <SelectItem value='null'>
                      검색결과가 없습니다.
                      <Button type='button' onClick={() => setOpen(false)}>
                        다시검색
                      </Button>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    ></FormField>
  );
};

export default PlaceField;
