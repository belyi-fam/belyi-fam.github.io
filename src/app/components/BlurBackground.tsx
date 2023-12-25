'use client';

import React from 'react';
import useMembersSelected from '@/app/hooks/useMembersSelected';

import '@/app/styles/background.scss';

const BlurBackground = () => {
  const [membersSelected] = useMembersSelected();
  const backgroundClassName = membersSelected.map((m) => `${m.toLowerCase()}-background`).join(' ');

  return (
    <div id="stars" className={backgroundClassName} />
  );
};

export default BlurBackground;
