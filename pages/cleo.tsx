import React from 'react';
import Image from 'next/image';
import { Heart, Mail, Phone, PawPrint, Sparkles, Home, Shield } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Card, CardContent } from '@/app/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { randomize } from '@/util/random';
import '@/app/output.css';

const VIDEO_CLEO = '/img/cleo/cleo_video.mp4';
const ME = '/img/cleo/me.jpg';

const CLEO_4549 = '/img/cleo/IMG_4549.jpg';
const CLEO_5575 = '/img/cleo/IMG_5575.jpg';
const CLEO_5648 = '/img/cleo/IMG_5648.jpg';
const CLEO_5711 = '/img/cleo/IMG_5711.jpg';
const CLEO_6313 = '/img/cleo/IMG_6313.jpg';
const CLEO_6400 = '/img/cleo/IMG_6400.jpg';
const CLEO_6484 = '/img/cleo/IMG_6484.jpg';
const CLEO_6486 = '/img/cleo/IMG_6486.jpg';
const CLEO_6647 = '/img/cleo/IMG_6647.jpg';
const CLEO_6649 = '/img/cleo/IMG_6649.jpg';
const CLEO_6712 = '/img/cleo/IMG_6712.jpg';
const CLEO_7502 = '/img/cleo/IMG_7502.jpg';
const CLEO_7554 = '/img/cleo/IMG_7554.jpg';
const CLEO_7623 = '/img/cleo/IMG_7623.jpg';
const CLEO_7735 = '/img/cleo/IMG_7735.jpg';
const CLEO_7787 = '/img/cleo/IMG_7787.jpg';
const CLEO_7797 = '/img/cleo/IMG_7797.jpg';

const PROFILE_CLEO = CLEO_5711;
const HERO_POSTER = '/img/cleo/cleo_video_poster.jpg';

const ALL_CLEO = [
  CLEO_4549, CLEO_5575, CLEO_5648, CLEO_6313, CLEO_6400, CLEO_6484, CLEO_6486,
  CLEO_6647, CLEO_6649, CLEO_6712, CLEO_7502, CLEO_7554, CLEO_7623, CLEO_7735, CLEO_7787, CLEO_7797,
];

const Cleo = () => {
  const [cleoIndex, setCleoIndex] = React.useState(0);
  const shuffledCleo = React.useMemo(() => randomize([...ALL_CLEO]), []);

  const handleCall = () => {
    window.location.href = 'tel:+19787641250';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:leonid@ac93.org';
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ color: '#f5f0ff' }}>
      <style jsx global>{`
        html, body { background: transparent !important; color: #f5f0ff; }
        body { margin: 0; }
        @keyframes cleo-drift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes cleo-float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-30px, 20px) scale(0.97); }
        }
        @keyframes cleo-float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 40px) scale(1.08); }
        }
        @keyframes cleo-float-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 50px) scale(1.04); }
        }
        @keyframes cleo-blob-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(60px, -80px) scale(1.1); }
          50% { transform: translate(-40px, 40px) scale(0.95); }
          75% { transform: translate(30px, 60px) scale(1.05); }
        }
        @keyframes cleo-blob-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-70px, 50px) scale(1.08); }
          66% { transform: translate(50px, -40px) scale(0.92); }
        }
        @keyframes cleo-blob-drift-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, 70px) scale(1.12); }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(120deg, #000000 0%, #060010 18%, #1a0a2e 38%, #3d1f5c 55%, #1a0a2e 72%, #050008 88%, #000000 100%)',
          backgroundSize: '300% 300%',
          animation: 'cleo-drift 22s ease-in-out infinite',
        }}
      />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', width: 520, height: 520, borderRadius: 9999,
            top: -160, left: -160, filter: 'blur(100px)', opacity: 0.32, mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
            animation: 'cleo-float-a 18s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute', width: 460, height: 460, borderRadius: 9999,
            bottom: -200, right: -140, filter: 'blur(110px)', opacity: 0.28, mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            animation: 'cleo-float-b 24s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute', width: 380, height: 380, borderRadius: 9999,
            top: '45%', left: '60%', filter: 'blur(120px)', opacity: 0.22, mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #c084fc 0%, transparent 70%)',
            animation: 'cleo-float-c 30s ease-in-out infinite',
          }}
        />
      </div>

      {/* Floating gradient blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
        {[
          { size: 280, top: '8%',  left: '10%', hue: '#a78bfa', opacity: 0.22, blur: 80,  duration: 24, delay: 0,   anim: 'a' },
          { size: 360, top: '20%', left: '70%', hue: '#7c3aed', opacity: 0.20, blur: 100, duration: 30, delay: 4,   anim: 'b' },
          { size: 220, top: '55%', left: '25%', hue: '#c084fc', opacity: 0.18, blur: 70,  duration: 26, delay: 7,   anim: 'c' },
          { size: 320, top: '70%', left: '60%', hue: '#8b5cf6', opacity: 0.20, blur: 90,  duration: 32, delay: 2,   anim: 'a' },
          { size: 200, top: '40%', left: '50%', hue: '#d8b4fe', opacity: 0.16, blur: 75,  duration: 22, delay: 9,   anim: 'b' },
          { size: 260, top: '85%', left: '12%', hue: '#a855f7', opacity: 0.19, blur: 85,  duration: 28, delay: 5,   anim: 'c' },
          { size: 180, top: '5%',  left: '45%', hue: '#c4b5fd', opacity: 0.15, blur: 65,  duration: 20, delay: 11,  anim: 'a' },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              borderRadius: 9999,
              filter: `blur(${b.blur}px)`,
              opacity: b.opacity,
              mixBlendMode: 'screen',
              background: `radial-gradient(circle, ${b.hue} 0%, transparent 70%)`,
              animation: `cleo-blob-drift-${b.anim} ${b.duration}s ease-in-out ${b.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-5 py-16 md:py-24" style={{ zIndex: 10 }}>
        <header className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: '#f5e8ff' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#f5e8ff' }}>
              Looking for a Forever Home
            </span>
          </div>

          <div
            className="relative mx-auto mb-8 overflow-hidden rounded-full"
            style={{
              width: 220,
              height: 220,
              boxShadow: '0 25px 60px -15px rgba(76, 29, 149, 0.7), 0 0 0 4px rgba(255,255,255,0.18) inset',
              border: '4px solid rgba(255,255,255,0.35)',
            }}
          >
            <Image src={PROFILE_CLEO} alt="Cleo" layout="fill" objectFit="cover" priority />
          </div>

          <h1
            className="text-6xl md:text-7xl font-bold mb-4"
            style={{
              color: '#ffffff',
              textShadow: '0 4px 30px rgba(76, 29, 149, 0.6), 0 2px 8px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            Meet Cleo
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'rgba(245, 232, 255, 0.85)' }}>
            A sweet, soulful cat searching for her best single-pet home
          </p>
        </header>

        {/* Hero photo + intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
          <div
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40 ring-1 ring-white/20 cursor-pointer group"
            onClick={() => setCleoIndex((i) => (i + 1) % shuffledCleo.length)}
          >
            {shuffledCleo.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 transition-opacity duration-500 ${index !== cleoIndex ? 'opacity-0' : 'opacity-100'}`}
              >
                <Image
                  src={image}
                  alt="Cleo the cat"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform group-hover:rotate-180 duration-500">
              <FontAwesomeIcon icon={faRedo} className="h-4 w-4 text-white" />
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs text-purple-50/90 border border-white/10">
              {cleoIndex + 1} / {shuffledCleo.length} — tap for next
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-5 text-white">About Cleo</h2>
            <p className="text-purple-50/90 leading-relaxed mb-4">
              Cleo is a beautiful, affectionate cat who is absolutely precious. She's roughly 3 years old,
              with an incredibly soft, fluffy coat that's perfect for cuddling. She loves feather toys, sunny
              spots, and curling up next to her people.
            </p>
            <p className="text-purple-50/90 leading-relaxed">
              She's spayed, fully up-to-date on vaccinations, in excellent health, litter-box
              trained, and an absolute sweetheart with humans.
            </p>
          </div>
        </div>

        {/* The honest story */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-5">
              <Heart className="h-6 w-6 text-fuchsia-300" />
              <h2 className="text-3xl font-semibold text-white">Why Cleo Needs a New Home</h2>
            </div>
            <p className="text-purple-50/90 leading-relaxed mb-4">
              To be completely honest and upfront. I've had her for over a year and I've been trying
              to make things work between her and my other cat, Toast. Unfortunately, every step forward
              has been followed by setbacks, and the truth is that the situation is stressing Cleo out more
            </p>
            <p className="text-purple-50/90 leading-relaxed">
              Cleo is a beautfiul, wonderful petite cat and with human, she is sweet, gentle, a cuddle-bug,
              and full of personality. She just completely switches whenever she sees another animal and
              freaks out... our best guess is that it's a trauma thing, not a Cleo thing. She's not a bad
              cat whatsoever. She's a great cat in a difficult environment for her.
            </p>
          </CardContent>
        </Card>

        {/* Photo strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
          {[CLEO_5575, CLEO_6400, CLEO_6712, CLEO_7554, CLEO_7623, CLEO_7787].map((src, i) => (
            <div
              key={src}
              className={`relative aspect-square rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl shadow-purple-900/30 ${i >= 3 ? 'hidden md:block' : ''}`}
            >
              <Image src={src} alt="Cleo" layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>

        {/* Why it can't continue here */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-5">
              <Home className="h-6 w-6 text-purple-200" />
              <h2 className="text-3xl font-semibold text-white">Why Our Home Isn't Right for Her</h2>
            </div>
            <p className="text-purple-50/90 leading-relaxed mb-4">
              We plan on having more animals in our family, and Cleo simply wouldn't do her best in
              a home like ours. Right now, this is a stressful environment for her, for Toast,
              and honestly for us too. Cleo deserves to relax. She deserves to stop being on alert.
              She deserves to be someone's everything, getting all of the pets in a calm and warm
              environment {'<3'}
            </p>
            <p className="text-purple-50/90 leading-relaxed">
              We all deserve peace in our lives especially lil Clee :) 
              The kindest thing I can do for her now is help her find the home where she gets that.
            </p>
          </CardContent>
        </Card>

        {/* Video */}
        <div className="my-14 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Watch her big jumps :)</h2>
          <div className="relative pt-[56.25%] rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-purple-900/40">
            <video
              controls
              className="absolute top-0 left-0 w-full h-full"
              poster={HERO_POSTER}
            >
              <source src={VIDEO_CLEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Ideal home */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-5">
              <Shield className="h-6 w-6 text-purple-200" />
              <h2 className="text-3xl font-semibold text-white">Cleo's Ideal Home</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'A quiet, calm environment where she can finally exhale',
                'A pet-free home, she should be the only animal',
                'Patient, loving people who give her time to settle in',
                'Indoor-only living to keep her safe',
                'Sunny window perches for bird watching',
                'Space to run her little heart out',
                'Cozy spots to nap, snuggle, and just be',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <PawPrint className="h-5 w-5 text-fuchsia-300 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-50/90">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Personality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-14 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-purple-900/40">
            <Image src={CLEO_6647} alt="Cleo being her sweet self" layout="fill" objectFit="cover" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white mb-5">Cleo's Personality</h2>
            <ul className="space-y-3">
              {[
                'Gentle and deeply affectionate with humans',
                'Loves feather toys and things to chase',
                'Gets super cute zoomies and loves to play',
                'Loves sunny spaces and curling up in a cozy spot',
                'Prefers calm and quiet and thrives in peace',
                'Snuggles up the moment she trusts you',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <PawPrint className="h-5 w-5 text-fuchsia-300 flex-shrink-0" />
                  <span className="text-purple-50/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* About me */}
        <Card>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full overflow-hidden ring-2 ring-white/30 shadow-xl shadow-purple-900/40 flex-shrink-0">
                <Image src={ME} alt="Leo" layout="fill" objectFit="cover" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-white mb-4">About Me</h2>
                <p className="text-purple-50/90 leading-relaxed mb-4">
                  Hi, I'm Leo. I've loved Cleo for over a year and it breaks my heart to
                  rehome her, but I care about her too much to let her keep living in a way
                  that's stressing her out. I'm a software engineer who has always cared deeply
                  about animal welfare.
                </p>
                <p className="text-purple-50/90 leading-relaxed">
                  I want nothing but the best for Cleo, and I'm committed to finding her the
                  perfect, peaceful forever home where she can be the center of attention she
                  deserves to be.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center my-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">Want to Meet Cleo?</h2>
          <p className="text-purple-100/80 mb-8 max-w-xl mx-auto">
            If you can offer her the calm, single-pet home she deserves, I would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleCall}>
              <Phone className="h-4 w-4 mr-2" /> Call Me
            </Button>
            <Button variant="outline" onClick={handleEmail}>
              <Mail className="h-4 w-4 mr-2" /> Email Me
            </Button>
          </div>
        </div>

        <footer className="text-center text-purple-100/70 text-sm pb-4">
          <p>
            Thank you for considering giving Cleo a loving home{' '}
            <Heart className="inline h-4 w-4 text-fuchsia-300" />
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Cleo;
