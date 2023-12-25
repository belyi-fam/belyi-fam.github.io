'use client';

import React from 'react';
import useMembersSelected from '@/app/hooks/useMembersSelected';

import '@/app/styles/background.scss';
import { wholeFamily } from '@/common/types';

const BlurBackground = () => {
  const [membersSelected, memberIsSelected] = useMembersSelected();
  const backgroundClassName = membersSelected.map((m) => `${m.toLowerCase()}-background`).join(' ');

  return (
    <div id="blur-background" className={backgroundClassName}>
      {wholeFamily.map((member) => (
        <div key={member} className={`gradient-layer ${member.toLowerCase()}-background${memberIsSelected(member) ? ' visible' : ''}`} />
      ))}
    </div>
  );
};

export default BlurBackground;
