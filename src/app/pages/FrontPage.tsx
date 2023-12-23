'use client';

import React from 'react';
import { wholeFamily } from '@/app/types';
import { FAMILY_COLORS } from '@/app/data/constants';
import useMembersSelected from '@/app/hooks/useMembersSelected';

/**
 * The front page will look very simple. Just a page with the family and
 * then all of the toggle buttons for each one of the family members.
 *
 * |----------------------------------------|
 * |                                        |
 * |                                        |
 * |                                        |
 * |                  Belyi                 |
 * |                                        |
 * |                                        |
 * |                                        |
 * | Leo   Katya   Kass   Syd   Igor  Tanya |
 * |----------------------------------------|
 *
 * @constructor
 */
const FrontPage = () => {
  const [memberIsSelected, toggleMember] = useMembersSelected();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-8">Belyi</div>
      <div className="flex gap-2">
        {wholeFamily.map((name) => (
          <button
            key={name}
            className={`px-4 py-2 rounded focus:outline-none ${memberIsSelected(name) ? FAMILY_COLORS[name] : 'bg-gray-200'}`}
            onClick={() => toggleMember(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};;

export default FrontPage;
