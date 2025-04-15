import { differenceInCalendarDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ContactPlansCardProps {
  title: string;
  startDate: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ContactPlansCard: React.FC<ContactPlansCardProps> = ({ title, startDate, onEdit, onDelete }) => {
  const today = new Date();
  const start = new Date(startDate);
  const dDay = differenceInCalendarDays(new Date(startDate), today);
  const monthDay = format(start, 'M월 d일', { locale: ko });

  return (
    <div
      onClick={() => {
        console.log('clicked');
      }}
      className='relative flex flex-col gap-2 rounded-lg border border-gray-100 bg-white p-4 shadow-md'
      style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)' }}
    >
      {/* 왼쪽 라인 */}
      <div className='absolute left-0 top-0 h-full w-1 rounded-l-md bg-pink-500' />

      {/* 날짜 & 수정 버튼 라인 */}
      <div className='flex items-center justify-between'>
        <p className='text-sm font-semibold text-gray-700'>{monthDay}</p>
        {onEdit && (
          <button onClick={onEdit} className='text-xs text-blue-500 underline'>
            수정
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className='text-xs text-red-500 underline'>
            삭제
          </button>
        )}
      </div>

      {/* D-day & 제목 */}
      <div className='flex flex-col'>
        <p className='text-lg font-bold text-black'>
          {dDay === 0 ? 'D-Day' : dDay > 0 ? `D-${dDay}` : `D+${Math.abs(dDay)}`}
        </p>
        <p className='text-base text-gray-800'>{title}</p>
      </div>

      {/* 해시태그 추가 예정 */}
    </div>
  );
};

export default ContactPlansCard;
