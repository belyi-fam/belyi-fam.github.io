import React from 'react';
import Image from 'next/image';
import { Heart, Mail, Phone, PawPrint } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Card, CardContent } from '@/app/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import '@/app/output.css';

const VIDEO_CLEO = '/img/cleo/cleo_video.mp4';
const CAR_CLEO = '/img/cleo/IMG_5972.jpg';
const SLEEPY_BUCKET_CLEO = '/img/cleo/IMG_6156.jpg';
const AWAKE_BUCKET_CLEO = '/img/cleo/IMG_6159.jpg'
const CUTE_BUCKET_CLEO = '/img/cleo/IMG_6168.jpg';
const CURIOUS_BUCKET_CLEO = '/img/cleo/IMG_6172.jpg';
const WISTFUL_BUCKET_CLEO = '/img/cleo/IMG_6192.jpg';
const AIRPLANE_EAR_CLEO = '/img/cleo/IMG_6229.jpg';
const ATTENTION_GRABBED_CLEO = '/img/cleo/IMG_6230.jpg';
const NUZZLE_CLEO = '/img/cleo/IMG_6233.jpg';
const TOAST_AND_CLEO = '/img/cleo/IMG_6255.jpg';
const CODING_NUZZLE_CLEO = '/img/cleo/IMG_6368.jpg';
const COUCH_NUZZLE_CLEO = '/img/cleo/IMG_6481.jpg';
const PERFECT_SHINE_CLEO = '/img/cleo/IMG_9287.jpg';
const FACE_CLEO = '/img/cleo/IMG_9293.jpg';
const LOOKING_AWAY_CLEO = '/img/cleo/IMG_9298.jpg';
const ME = '/img/cleo/IMG_8109.jpg';

const ALL_CLEO = [CAR_CLEO, SLEEPY_BUCKET_CLEO, AWAKE_BUCKET_CLEO, CUTE_BUCKET_CLEO, CURIOUS_BUCKET_CLEO, WISTFUL_BUCKET_CLEO, AIRPLANE_EAR_CLEO, ATTENTION_GRABBED_CLEO, NUZZLE_CLEO, TOAST_AND_CLEO, CODING_NUZZLE_CLEO, COUCH_NUZZLE_CLEO, PERFECT_SHINE_CLEO, FACE_CLEO, LOOKING_AWAY_CLEO];

const Cleo = () => {
  const [cleoIndex, setCleoIndex] = React.useState(0);

  const handleCall = () => {
    window.location.href = 'tel:+19787641250';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:leonid@ac93.org';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-500 mb-2">Meet Cleo</h1>
          <p className="text-xl text-purple-600">A Loving Cat Looking for Her Forever Home</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="relative w-full sm:w-1/2 p-2" onClick={() => setCleoIndex((i) => (i + 1) % ALL_CLEO.length)}>
              <div className="relative w-full h-0 pb-[100%] rounded-md overflow-hidden">
                {ALL_CLEO.map((image, index) => (
                  <div
                    key={image}
                    className={`absolute inset-0 ${index !== cleoIndex ? 'hidden' : ''}`}
                  >
                    <Image
                      src={image}
                      alt="Cleo the cat"
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0"
                    />
                  </div>
                ))}
                <div className="absolute bottom-2 right-2">
                  <FontAwesomeIcon icon={faRedo} className="h-6 w-6 text-gray-300"/>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">About Cleo</h2>
            <p className="mb-4">
              Cleo is a beautiful and affectionate cat with a heart of gold. She's approximately 2
              years old and has a
              soft, fluffy coat that's perfect for cuddling. Cleo loves to play with feather toys
              and enjoys basking in
              sunny spots around the house.
            </p>
            <p>
              She's spayed, up-to-date on vaccinations, and in excellent health. Cleo is litter box
              trained and well-behaved.
            </p>
          </div>
        </div>

        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">Why Cleo Needs a New
              Home</h2>
            <p className="mb-4">
              It breaks my heart to have to find a new home for Cleo, but it's in her best interest. Cleo doesn't play well
              with my current cat, Toast, and seems to have some trauma around interacting with other cats. This has led to
              stress for both Cleo and Toast.
            </p>
            <p>
              However, Cleo is absolutely perfect with humans! She's loving, gentle, and always ready for cuddles. She deserves
              a home where she can be the center of attention and feel safe and loved.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-8 my-8">
          <Image
            src={CUTE_BUCKET_CLEO}
            alt="Cleo found her spot :)"
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
          <Image
            src={LOOKING_AWAY_CLEO}
            alt="Cleo napping in a sunbeam"
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
          <Image
            src={NUZZLE_CLEO}
            alt="Cleo looking out a window"
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Listen to Her Adorable Squeaks</h2>
          <div className="relative pt-[56.25%]">
            <video
              controls
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
              poster={ATTENTION_GRABBED_CLEO}
            >
              <source src={VIDEO_CLEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">Cleo's Ideal Home</h2>
            <ul className="list-disc pl-6">
              <li>A quiet environment where she can feel safe and relaxed</li>
              <li>A home without other cats, as Cleo prefers to be the only feline</li>
              <li>Patient and loving owners who will give her time to adjust</li>
              <li>Indoor-only living to keep her safe and healthy</li>
              <li>Plenty of cozy spots for napping and window perches for bird watching</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <Image
              src={CODING_NUZZLE_CLEO}
              alt="Cleo being petted by her current owner"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">Cleo's Personality</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <PawPrint className="h-5 w-5 text-purple-600 mr-2" />
                <span>Gentle and affectionate with humans</span>
              </li>
              <li className="flex items-center">
                <PawPrint className="h-5 w-5 text-purple-600 mr-2" />
                <span>Loves to play with feather toys and laser pointers</span>
              </li>
              <li className="flex items-center">
                <PawPrint className="h-5 w-5 text-purple-600 mr-2" />
                <span>Enjoys lounging in sunny spots</span>
              </li>
              <li className="flex items-center">
                <PawPrint className="h-5 w-5 text-purple-600 mr-2" />
                <span>Prefers a calm, quiet environment</span>
              </li>
              <li className="flex items-center">
                <PawPrint className="h-5 w-5 text-purple-600 mr-2" />
                <span>Needs a patient owner to help her feel secure</span>
              </li>
            </ul>
          </div>
        </div>

        <Card>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center">
              <Image
                src={ME}
                alt="Cleo's current owner"
                width={200}
                height={200}
                className="rounded-full shadow-md mb-4 md:mb-0 md:mr-6"
              />
              <div>
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">About Cleo's Current Owner</h2>
                <p className="mb-4">
                  Hi, I'm Leo. I've been Cleo's loving owner for the past few months, and it breaks my heart to have to find her a new home. I'm a Software Engineer and have always been passionate about animal welfare.
                </p>
                <p>
                  I want nothing but the best for Cleo, and I'm committed to finding her a perfect forever home where she can thrive and be the center of attention she deserves to be.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center my-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Want to Meet Cleo?</h2>
          <p className="text-gray-600 mb-4">
            If you think you can provide the perfect forever home for Cleo, I'd love to hear from you!
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={handleCall}>
              <Phone className="h-4 w-4 mr-2" /> Call Me
            </Button>
            <Button variant="outline" onClick={handleEmail}>
              <Mail className="h-4 w-4 mr-2" /> Email Me
            </Button>
          </div>
        </div>

        <footer className="text-center text-gray-600">
          <p>Thank you for considering giving Cleo a loving home! <Heart className="inline h-4 w-4 text-red-500" /></p>
        </footer>
      </div>
    </div>
  )
};

export default Cleo;
