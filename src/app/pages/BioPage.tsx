'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Bio, getMembersPrettyString, getMembersString, Member, Optional } from '@/common/types';
import useMembersSelected from '@/app/hooks/useMembersSelected';
import { fetchBio } from '@/app/api/bio';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { getRandom } from '@/util/random';

/**
 * The bio page will show the bio based on the selected members. Let's format
 * it like this
 *
 * |----------------------------------------|
 * | ---------------     Archetype Name     |
 * | |             |                        |
 * | |             |  Description.....      |
 * | |             |                        |
 * | |             |                        |
 * | ---------------                        |
 * | Wrap around the image?                 |
 * |                                        |
 * |                                        |
 * |----------------------------------------|
 *
 * @constructor
 */
const BioPage = () => {
  const [membersSelected] = useMembersSelected();
  const [bio, setBio] = useState<Optional<Bio>>()
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    console.log(`Members Selected Changed to: ${membersSelected}`);
    fetchBio(membersSelected).then((bio) => {
      setBio(bio);
      setCurrentImageIndex(0);
    });
  }, [getMembersString(membersSelected as Member[])]);

  const changeImage = () => {
    if (bio && bio.images && bio.images.length > 0) {
      const nextIndex = (currentImageIndex + 1) % bio.images.length;
      setCurrentImageIndex(nextIndex);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full h-screen p-2 relative" style={{height: 'calc(100vh - 5rem)'}}>
      {bio ? (
        <>
          {/* Bio Header and Subtitle for Small Screens */}
          <div className="sm:hidden w-full flex flex-col p-4">
            <h1 className="text-3xl text-left mb-1">
              {bio.name}
            </h1>
            <p className="text-left italic mb-2 font-thin text-gray-500">
              {getMembersPrettyString(membersSelected as Member[])}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full sm:w-1/2 p-2" onClick={changeImage}>
            <div className="relative w-full h-0 pb-[100%] rounded-md overflow-hidden">
              {bio.images.map((image, index) => (
                <div
                  key={image}
                  className={`absolute inset-0 ${index !== currentImageIndex ? 'hidden' : ''}`}
                >
                  <Image
                    src={image}
                    alt={bio.name}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                  />
                </div>
              ))}
              {bio.images.length > 1 && (
                <div className="absolute bottom-2 right-2">
                  <FontAwesomeIcon icon={faRedo} className="h-6 w-6 text-gray-700"/>
                </div>
              )}
            </div>
          </div>

          {/* Description for Small Screens */}
          <div className="sm:hidden w-full flex flex-col p-4">
            <p className="text-left">
              {bio.description}
            </p>
          </div>

          {/* Bio Name and Description for Large Screens */}
          <div className="hidden sm:flex w-full sm:w-1/2 h-full flex-col p-4">
            <h1 className={`${bio.name.length > 20 ? 'text-xl' : 'text-3xl'} text-left mb-1`}>
              {bio.name}
            </h1>
            <p className="text-left italic mb-2 font-thin text-gray-500">
              {getMembersPrettyString(membersSelected as Member[])}
            </p>
            <p className="text-left">
              {bio.description}
            </p>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BioPage;
