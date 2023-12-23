import { FunctionComponent } from 'react';
import { StaticImageData } from 'next/image';

export enum Member {
  Igor = 'Igor',
  Kass = 'Kass',
  Katya = 'Katya',
  Leo = 'Leo',
  Syd = 'Syd',
  Tanya = 'Tanya',
}

export const humanFamily: Member[] = [Member.Igor, Member.Kass, Member.Katya, Member.Leo, Member.Tanya];
export const wholeFamily: Member[] = [Member.Igor, Member.Kass, Member.Katya, Member.Leo, Member.Syd, Member.Tanya];

export type MembersSelected = {
  [p in Member as string]: boolean;
};

export const IGOR = Member.Igor as string;
export const KASS = Member.Kass as string;
export const KATYA = Member.Katya as string;
export const LEO = Member.Leo as string;
export const SYD = Member.Syd as string;
export const TANYA = Member.Tanya as string;
export const IGORKASS = IGOR + KASS;
export const IGORKATYA = IGOR + KATYA;
export const IGORLEO = IGOR + LEO;
export const IGORTANYA = IGOR + TANYA;
export const KASSKATYA = KASS + KATYA;
export const KASSLEO = KASS + LEO;
export const KASSTANYA = KASS + TANYA;
export const KATYALEO = KATYA + LEO;
export const KATYATANYA = KATYA + TANYA;
export const LEOTANYA = LEO + TANYA;
export const IGORKASSKATYA = IGORKASS + KATYA;
export const IGORKASSLEO = IGORKASS + LEO;
export const IGORKASSTANYA = IGORKASS + TANYA;
export const IGORKATYALEO = IGORKATYA + LEO;
export const IGORKATYATANYA = IGORKATYA + TANYA;
export const IGORLEOTANYA = IGORLEO + TANYA
export const KASSKATYALEO = KASSKATYA + LEO;
export const KASSKATYATANYA = KASSKATYA + TANYA;
export const KASSLEOTANYA = KASSLEO + TANYA;
export const KATYALEOTANYA = KATYALEO + TANYA;
export const IGORKASSKATYALEO = IGORKASSKATYA + LEO
export const IGORKASSKATYATANYA = IGORKASSKATYA + TANYA;
export const IGORKASSLEOTANYA = IGORKASSLEO + TANYA;
export const IGORKATYALEOTANYA = IGORKATYALEO + TANYA;
export const KASSKATYALEOTANYA = KASSKATYALEO + TANYA;
export const IGORKASSKATYALEOTANYA = IGORKASSKATYALEO + TANYA;

export const getMembersString = (members: Member[]) => {
  // Adding Syd to the complex dynamics seems very difficult and increases the order
  // of magnitude on the amount of different cases by kind of a lot. He'll have his
  // dedicated page, but not going beyond that.
  if (members.length === 1 && members[0] === Member.Syd) {
    return SYD;
  }

  const humanMembers = members.filter((member) => member !== Member.Syd);
  return (humanMembers.length === 0 || humanMembers.length >= 5) ? (
    IGORKASSKATYALEOTANYA
  ) : (
    (humanMembers as string[]).toSorted().reduce((member, membersString) => membersString + member, '')
  );
};

export interface Bio {
  name: string;
  description: string;
  image: StaticImageData;
}

export interface Widget extends FunctionComponent {

}
