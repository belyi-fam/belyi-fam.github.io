import { useState } from 'react';
import { IGOR, KASS, KATYA, LEO, MembersSelected, SYD, TANYA } from '@/app/types';

const useMembersSelected = (): [(m: string) => boolean, (m: string) => void, string[]] => {
  const [membersSelected, setMembersSelected] = useState<MembersSelected>({
    [IGOR]: false,
    [KASS]: false,
    [KATYA]: false,
    [LEO]: false,
    [SYD]: false,
    [TANYA]: false,
  });

  const memberIsSelected = (member: string): boolean => membersSelected[member] || false;
  const membersSelectedArray = Object.keys(membersSelected).filter(memberIsSelected);
  const toggleMember = (member: string) => {
    setMembersSelected((prevState) => ({
      ...prevState,
      [member]: !prevState[member]
    }));
  };

  return [memberIsSelected, toggleMember, membersSelectedArray];
};

export default useMembersSelected;
