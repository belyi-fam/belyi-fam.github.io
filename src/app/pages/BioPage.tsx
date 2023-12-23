import React from 'react';
import Image from 'next/image';
import { Bio } from '@/app/types';

export interface BioPageProps {
  bio: Bio;
}

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
const BioPage = ({ bio }: BioPageProps) => {
  return (
    <div className="flex flex-col justify-between p-4">
      <Image src={bio.image} alt={bio.name} />
      <div className="flex flex-row">
        <div className="flex justify-center items-center">
          <b>
            {bio.name}
          </b>
          <p>
            {bio.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioPage;
