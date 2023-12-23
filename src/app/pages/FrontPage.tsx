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
    <div className="flex flex-col h-screen w-screen">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-6xl">Rnadom</div>
      </div>
      <div className="flex justify-around items-center w-full px-4 pb-4">
        {wholeFamily.map((name) => (
          <button
            key={name}
            style={{backgroundColor: memberIsSelected(name) ? FAMILY_COLORS[name] : '#e5e7eb'}} // #e5e7eb is the equivalent of bg-gray-200
            className="px-4 py-2 rounded focus:outline-none"
            onClick={() => toggleMember(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
