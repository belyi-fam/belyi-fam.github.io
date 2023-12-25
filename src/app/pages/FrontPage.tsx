'use client';

import React, { useEffect, useState } from 'react';
import { wholeFamily } from '@/common/types';
import { FAMILY_COLORS, LIGHTER_FAMILY_COLORS } from '@/data/colors';
import useMembersSelected from '@/app/hooks/useMembersSelected';

const UNSELECTED_BUTTON_COLOR = '#2b2b2c';
const BUTTON_BORDER = '#1f2021';

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
  const [_, memberIsSelected, toggleMember] = useMembersSelected();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex-grow flex items-center justify-center">
        <div className={`text-6xl ${fadeIn ? 'fade-in' : ''}`}>The Belyi Family</div>
      </div>
      <div className="flex justify-around items-center w-full px-4 pb-4" style={{height: '4rem'}}>
        {wholeFamily.map((name) => (
          <button
            key={name}
            style={{
              backgroundColor: memberIsSelected(name) ? 'transparent' : UNSELECTED_BUTTON_COLOR,
              border: '1px solid',
              borderColor: memberIsSelected(name) ? 'transparent' : BUTTON_BORDER,
              backgroundImage: memberIsSelected(name) ? `linear-gradient(45deg, ${FAMILY_COLORS[name]}, ${LIGHTER_FAMILY_COLORS[name]})` : 'none',
              animation: memberIsSelected(name) ? 'gradientAnimation 3s linear infinite' : 'none',
              backgroundSize: '200% 200%',
            }}
            className="px-4 py-2 rounded focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
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
