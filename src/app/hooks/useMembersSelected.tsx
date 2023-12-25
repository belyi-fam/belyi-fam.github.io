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

/**
 * Returns a tuple containing three elements:
 *   - A function that takes a string parameter and returns a boolean value indicating whether the string is included in the membersSelectedArray.
 *   - A function that takes a string parameter and adds or removes the string from the membersSelectedArray.
 *   - An array of strings representing the members selected.
 *
 * @return {[(m: string) => boolean, (m: string) => void, string[]]} - The tuple containing the memberIsSelected function, toggleMember function, and membersSelectedArray.
 */
const useMembersSelected = (): [string[], (m: string) => boolean, (m: string) => void] => {
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
    const newQuery = { ...router.query };


    if (newSelectedMembers.length > 0) {
      newQuery[SELECTED_QUERY_KEY] = newSelectedMembers.join(',');
    } else {
      delete newQuery[SELECTED_QUERY_KEY];
    }

    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true }).then(() => {
      console.log(`Updated query: ${JSON.stringify(newQuery)}`);
    }).catch(console.error);
  };

  return [membersSelectedArray, memberIsSelected, toggleMember];
};

export default useMembersSelected;
