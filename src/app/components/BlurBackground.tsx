'use client';

import React from 'react';
import useMembersSelected from '@/app/hooks/useMembersSelected';

const BlurBackground = () => {
  const [_t, _m, membersSelected] = useMembersSelected();
  const backgroundClassName = membersSelected.map((m) => `${m}-background`).join(' ');

  return (
    <div className={`blobs ${backgroundClassName}`} />
  );
};

export default BlurBackground;
