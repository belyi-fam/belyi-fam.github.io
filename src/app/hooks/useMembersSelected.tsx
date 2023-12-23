// import { IGOR, KASS, KATYA, LEO, SYD, TANYA } from '@/app/types';
import { useRouter } from 'next/router';

const SELECTED_QUERY_KEY = 'selected'; // Define a key for the URL parameter


// Helper function to safely parse the query parameter
const parseSelectedMembers = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string' && value.length > 0) {
    return value.split(',');
  }
  return [];
};

const useMembersSelected = (): [(m: string) => boolean, (m: string) => void, string[]] => {
  const router = useRouter();

  // Decode the URL parameter into an array
  const membersSelectedArray = parseSelectedMembers(router.query[SELECTED_QUERY_KEY]);


  const memberIsSelected = (member: string): boolean => {
    return membersSelectedArray.includes(member);
  };

  const toggleMember = (member: string) => {
    const newSelectedMembers = memberIsSelected(member) ?
      membersSelectedArray.filter(m => m !== member) : // Remove member
      [...membersSelectedArray, member]; // Add member

    // Update the URL
    const newQuery = { ...router.query, [SELECTED_QUERY_KEY]: newSelectedMembers.join(',') };
    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  };

  return [memberIsSelected, toggleMember, membersSelectedArray];
};

export default useMembersSelected;
