import { fetchContacts } from "@/app/api/supabase/service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation"

const PeopleDetail = () => {
    const {contacts_id} = useParams();

    const {data: contact, isPending, error} = useQuery({
        queryKey: ['contacts', contacts_id],
        queryFn: () => fetchContacts(contacts_id as string),
        enabled: !!contacts_id,
    });

    if (error) {
        console.error('연락처 로딩 실패', error);
    }
}

export default PeopleDetail;