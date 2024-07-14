import {
  Bio,
  getMembersString, humanFamily,
  IGOR, IGORKASS, IGORKASSKATYA, IGORKASSKATYALEO, IGORKASSKATYALEOTANYA,
  IGORKASSKATYATANYA, IGORKASSLEO, IGORKASSLEOTANYA, IGORKASSTANYA, IGORKATYA,
  IGORKATYALEO, IGORKATYALEOTANYA, IGORKATYATANYA, IGORLEO, IGORLEOTANYA,
  IGORTANYA, KASS, KASSKATYA, KASSKATYALEO, KASSKATYALEOTANYA, KASSKATYATANYA, KASSLEO,
  KASSLEOTANYA, KASSTANYA, KATYA, KATYALEO, KATYALEOTANYA, KATYATANYA, LEO, LEOTANYA,
  Member, SYD,
  TANYA,
} from '@/common/types';
import { getRandom, randomize } from '@/util/random';
import {
  bestFamilyImage,
  familyBetterThaiDinnerImage,
  familyCursedImage,
  familyEscapeRoomImage,
  familyGradImage,
  familyKassSelfie,
  familySDImage,
  familyThaiDinnerImage,
  joshTreeImage,
  kassCharadesImage,
  kassKatyaSydImage,
  kassLeoKatyaPeaceImage,
  kassLeoTrickPicture,
  kassMaineImage,
  kassMamaBostonImage,
  kassMamaKatyaPeaceImage,
  kassMamaPapaOtherPeachesImage,
  kassMamaPapaPeachesImage,
  kassMamaPapaThanksgivingImage,
  kassMamaSecondStrawberriesImage,
  kassMamaStrawberriesImage,
  kassPapaBeachImage,
  kassPapaKatyaNorthamptonImage,
  kassPapaMamaKatyaMassImage,
  kassPapaMamaSydImage,
  kassPapaRocksImage,
  kassPapaWoodsImage,
  kassPeacePicture,
  kassSanDiegoImage,
  kassSDPicture,
  kassSydCuteImage,
  kassSydDoorPicture,
  kassSydSkypePicture,
  kassSydWavingImage,
  katyaCatImage,
  katyaGoatImage,
  katyaKassCarImage,
  katyaKassTalkingImage,
  katyaLeoAhahaImage,
  katyaLeoBeachImage,
  katyaLeoChefImage,
  katyaLeoGradImage,
  katyaLeoMassHikeImage,
  katyaLeoNoodleImage,
  katyaLeoSDHikeImage,
  katyaLeoSDPictureImage,
  katyaLeoSDWalkingImage,
  katyaLeoSethImage,
  katyaLeoTropicalImage,
  katyaMamaLeoPapaPicturesImage,
  katyaMamaPapaPlaneImage,
  katyaMamaPapaSecondPlaneImage,
  katyaMamaSDImage,
  katyaOculusImage,
  katyaPapaGoatImage,
  katyaPapaHikeImage,
  katyaPapaMamaBeachImage,
  katyaPapaSDHikeImage,
  katyaSDHikeImage,
  katyaStuckImage,
  leoHawaiiImage,
  leoKatyaKassFarAwayImage,
  leoKatyaKassPeaceImage,
  leoKatyaPapaSDImage,
  leoKatyaPierImage,
  leoMamaPapaSinkImage,
  leoMouthDeepImage,
  leoPapaBackpackingImage,
  leoPapaKassHawaiiGameImage,
  leoPapaKassHawaiiImage,
  leoPapaKassHawaiiShipImage,
  leoPapaKassMamaSDImage,
  leoPapaKatyaKbbqImage,
  leoPapaKatyaMamaImage,
  leoPapaKatyaSDImage,
  leoPapaUtahImage,
  leoRedRocksImage,
  mamaBoredImage,
  mamaBridgeImage,
  mamaDonutImage,
  mamaHawaiiImage,
  mamaKassBabyPicture,
  mamaKassCatEarsImage,
  mamaKassPapaBeachImage,
  mamaKatyaCatPicture,
  mamaKatyaKassPapaImage,
  mamaKatyaKassPapaSmilesImage,
  mamaKatyaPapaLeoSDImage,
  mamaKatyaPictureImage,
  mamaLeoAirportImage,
  mamaLeoHawaiiImage,
  mamaPapaBoulderHikeImage,
  mamaPapaCrossImage,
  mamaPapaKassHikingImage,
  mamaPapaKassLeoHawaiiImage,
  mamaPapaKassLeoMaineImage,
  mamaPapaKassLeoTunnelImage,
  mamaPapaKassLeoXmasImage,
  mamaPapaKatyaMountainImage,
  mamaPapaLeoMaineImage,
  mamaPapaLeoRaceImage,
  mamaPapaMaineImage,
  mamaPapaOtherRaceImage,
  mamaPapaPeaceImage,
  mamaPapaRaceImage,
  mamaPapaStrawberriesImage,
  mamaPapaVotingImage,
  mamaPumpkinImage,
  mamaSydImage,
  mamaSydPunchPicture,
  notLeoInSanDiegoImage,
  papaAmesburyImage,
  papaBeachImage,
  papaBlueberriesImage,
  papaBoulderImage,
  papaBridgeImage,
  papaCharadesImage,
  papaHawaiiImage,
  papaKassBeachImage,
  papaKassBostonImage,
  papaKassLeoMamaHawaiiImage,
  papaKassLookingImage,
  papaKassPeaceImage,
  papaKassSecondBeachImage,
  papaKassBrightImage,
  papaKatyaBuildingImage,
  papaKatyaHikingImage,
  papaKatyaJTreeImage,
  papaKatyaMamaPhoneImage,
  papaKatyaTanyaImage,
  papaKnifeImage,
  papaLeoBennettChessImage,
  papaLeoChessImage,
  papaMamaBeachImage,
  papaMamaCitizenImage,
  papaMamaColdHikeImage,
  papaMamaKassBostonImage,
  papaMamaKassOtherThanksgivingImage,
  papaMamaKassThanksgivingImage,
  papaMamaKatyaHikeImage,
  papaMamaOtherHikeImage,
  papaMamaSDHikeImage,
  papaMamaSydImage,
  papaMamaYetAnotherHikeImage,
  papaRamenImage,
  papaSanDiegoImage,
  papaSecondBeachImage,
  papaSmilingBeachImage,
  papaStrawberryImage,
  papaSydHelpingImage,
  papaSydImage,
  papaSydPhoneImage,
  papaSydYogurtImage,
  secondBestFamilyImage,
  sydBagImage,
  sydCuteImage,
  sydFriedImage,
  sydLaptopImage,
  sydMovingImage,
  sydWhiskersImage,
  papaKassSalisburyBeach,
  mamaKassSalisburyBeach,
  kassSalisburyBeach,
  papaSalisburyBeach
} from '@/data/images';

const BIO_NAMES: { [membersString: string]: string[] } = {
  [IGOR]: ['The Always Hurting One'],
  [KASS]: ['The Leader', 'The Gamer'],
  [KATYA]: ['The Designer'],
  [LEO]: ['Gone With the Wind'],
  [TANYA]: ['The Cat Lover'],
  [IGORKASS]: ['The Game Changers'],
  [IGORKATYA]: ['The Deep Thinkers'],
  [IGORLEO]: ['The Soccer Squad'],
  [IGORTANYA]: ['The Guardians'],
  [KASSKATYA]: ['The Rainbow Royals'],
  [KASSLEO]: ['The Last Out of Pentucket'],
  [KASSTANYA]: ['The Conversation Starters'],
  [KATYALEO]: ['The Role-Players'],
  [KATYATANYA]: ['The Globe-trotters'],
  [LEOTANYA]: ['The PCTeam'],
  [IGORKASSKATYA]: ['The Show Stoppers'],
  [IGORKASSLEO]: ['The Geek Squad'],
  [IGORKASSTANYA]: ['The Covid Cabin'],
  [IGORKATYALEO]: ['The Free Spirits'],
  [IGORKATYATANYA]: ['The Eldest'],
  [IGORLEOTANYA]: ['The Weary Travellers'],
  [KASSKATYALEO]: ['The Silly Siblings'],
  [KASSKATYATANYA]: ['The Creative Crew'],
  [KASSLEOTANYA]: ['The Math Team'],
  [KATYALEOTANYA]: ['The Hikers'],
  [IGORKASSKATYALEO]: ['The Goofsters'],
  [IGORKASSKATYATANYA]: ['The East Coasters'],
  [IGORKASSLEOTANYA]: ['The Board Game Players'],
  [IGORKATYALEOTANYA]: ['The Adventurers'],
  [KASSKATYALEOTANYA]: ['The Healthy Legs'],
  [IGORKASSKATYALEOTANYA]: ['The Belyi Family', 'The Room Escapists', 'The Syd Watchers'],
  [SYD]: ['The Cutest Boy'],
};

const BIO_DESCRIPTIONS: { [membersString: string]: string[] } = {
  [IGOR]: ['Always nursing some injury, but never loses his humor.'],
  [KASS]: ['The one who leads with charisma and a love for gaming.'],
  [KATYA]: ['Creative at heart, designs everything from web comics to video games to dreams.'],
  [LEO]: ['Like a gust of wind, always moving and hard to catch.'],
  [TANYA]: ['Finds solace in the purrs and quirks of her feline friends.'],
  [IGORKASS]: ['Together, they redefine gaming with innovative ideas.'],
  [IGORKATYA]: ['Merging intellect and creativity, they ponder life’s mysteries and think deeply about the forces that govern our universe.'],
  [IGORLEO]: ['United by their passion for soccer, chess, and all forms of games, they play to win and play until they hurt :)'],
  [IGORTANYA]: ['Protectors of the family, they moved our lineage across the ocean and started our beautiful journey.'],
  [KASSKATYA]: ['They are the beautiful siblings who embrace their identity with pride and grace.'],
  [KASSLEO]: ['The last to leave any challenge, be it in Pentucket or life.'],
  [KASSTANYA]: ['Sparkling conversations start wherever they go, be it fun thought experiments or spicy debates.'],
  [KATYALEO]: ['In every role they play, they are imaginative and bring their stories to life.'],
  [KATYATANYA]: ['The internationally traveling duo, always on a new adventure to expand their worldviews.'],
  [LEOTANYA]: ['Together they managed to get Leo across the US along the Pacific Crest Trail, Tanya being the quintessential guide and harbinger of treats and supplies and support along the way.'],
  [IGORKASSKATYA]: ['The trio who love to get into their TV shows, be it Adventure Time, Steven Universe, Severance, or The Simpsons, they love to dive into stories and love to talk and theorize about them.'],
  [IGORKASSLEO]: ['The tech wizards, always ready to solve the next puzzle using the next best technology and who will most likely be the ones most interested on helping develop this website <3'],
  [IGORKASSTANYA]: ['Together, they navigated the challenges of a global pandemic being stuck in the Emery House together.'],
  [IGORKATYALEO]: ['Free-spirited and adventurous, exploring life without limits and experiencing everything and anything that expands their worldviews.'],
  [IGORKATYATANYA]: ['The wisest among the groups, sharing stories of yester-years, and were the first to trail-blaze the Belyi Family dynamic.'],
  [IGORLEOTANYA]: ['Journeying through life’s ups and downs with resilience and the most travelled among the family.'],
  [KASSKATYALEO]: ['Bonded in silliness and sibling camaraderie, they are the kids who spent many a road trip in the back of the car, playing video games, listening to music, and sharing all of the laughs.'],
  [KASSKATYATANYA]: ['Their creativity knows no bounds, inspiring all with their artistic spirits and wow-ing everyone with their beautiful creations.'],
  [KASSLEOTANYA]: ['Solving equations and life\'s puzzles with equal ease from their experiences in math-letics.'],
  [KATYALEOTANYA]: ['Trailblazers, literally and metaphorically, hiking their way through the mountains and stopping along the way to enjoy the views.'],
  [IGORKASSKATYALEO]: ['Masters of fun, turning every moment into a laugh and loving to joke around any chance they can get.'],
  [IGORKASSKATYATANYA]: ['East Coast vibes, bringing warmth and joy and aggressive driving wherever they go.'],
  [IGORKASSLEOTANYA]: ['Board game enthusiasts, strategizing for fun and life, and always being the ones most willing to agree to a 4-hour board game.'],
  [IGORKATYALEOTANYA]: ['Adventure is their middle name, seeking thrills in every corner.'],
  [KASSKATYALEOTANYA]: ['Healthy and active, they’re always on the move, and (for now) all have legs that have not been replaced just yet.'],
  [IGORKASSKATYALEOTANYA]: ['The Belyi Family, mastering escape rooms, binge-watching Syd’s adventures, watching Russian cartoons, extending Duolingo streaks, visiting Leo wherever he goes, and staying true as the family that came from Russia.'],
  [SYD]: ['With his undeniable charm, meows, and kibble-catching, he wins over everyone he meets and entrances everyone with his dashing good looks, and mesmerizing eyes.'],
};

/**
 * Map of the membersStrings the public paths to the images for the bio.
 */
const BIO_IMAGES: { [membersString: string]: string[] } = {
  [IGOR]: [
    papaSanDiegoImage, papaBeachImage, papaSydImage, papaHawaiiImage, papaAmesburyImage, papaBoulderImage,
    papaBridgeImage, papaRamenImage, papaKnifeImage, papaCharadesImage, papaStrawberryImage, papaSecondBeachImage,
    papaSmilingBeachImage, papaSydPhoneImage, papaSydYogurtImage, papaBlueberriesImage, papaSydHelpingImage,
    papaSalisburyBeach
  ],
  [KASS]: [
    kassSanDiegoImage, kassCharadesImage, kassPeacePicture, kassSDPicture, kassSydSkypePicture, kassSydDoorPicture,
    kassMaineImage, kassSydWavingImage, kassSydCuteImage, kassSalisburyBeach
  ],
  [KATYA]: [katyaSDHikeImage, katyaCatImage, katyaStuckImage, katyaGoatImage, katyaOculusImage],
  [LEO]: [leoHawaiiImage, leoRedRocksImage, leoMouthDeepImage],
  [TANYA]: [
    mamaHawaiiImage, mamaPumpkinImage, mamaBoredImage, mamaBridgeImage, mamaSydImage, mamaDonutImage,
    mamaSydPunchPicture
  ],
  [IGORKASS]: [
    kassPapaRocksImage, papaKassBostonImage, papaKassBeachImage, papaKassLookingImage, papaKassSecondBeachImage,
    kassPapaBeachImage, papaKassPeaceImage, kassPapaWoodsImage, papaKassSalisburyBeach, papaKassBrightImage
  ],
  [IGORKATYA]: [
    papaKatyaBuildingImage, papaKatyaJTreeImage, katyaPapaHikeImage, katyaPapaSDHikeImage, katyaPapaGoatImage,
    papaKatyaHikingImage
  ],
  [IGORLEO]: [leoPapaBackpackingImage, papaLeoChessImage, papaLeoBennettChessImage, leoPapaUtahImage],
  [IGORTANYA]: [
    mamaPapaCrossImage, mamaPapaMaineImage, papaMamaSDHikeImage, mamaPapaRaceImage, mamaPapaBoulderHikeImage,
    papaMamaOtherHikeImage, papaMamaYetAnotherHikeImage, papaMamaColdHikeImage, mamaPapaStrawberriesImage,
    papaMamaCitizenImage, mamaPapaVotingImage, mamaPapaOtherRaceImage, papaMamaSydImage, papaMamaBeachImage,
    mamaPapaPeaceImage
  ],
  [KASSKATYA]: [katyaKassCarImage, kassKatyaSydImage, katyaKassTalkingImage],
  [KASSLEO]: [kassLeoTrickPicture],
  [KASSTANYA]: [
    mamaKassCatEarsImage, kassMamaBostonImage, kassMamaStrawberriesImage,
    kassMamaSecondStrawberriesImage, mamaKassBabyPicture, mamaKassSalisburyBeach
  ],
  [KATYALEO]: [
    leoKatyaPierImage, katyaLeoGradImage, katyaLeoSDHikeImage, katyaLeoAhahaImage,
    katyaLeoNoodleImage, katyaLeoMassHikeImage, katyaLeoSethImage, katyaLeoChefImage,
    katyaLeoBeachImage, katyaLeoSDPictureImage, katyaLeoTropicalImage, katyaLeoSDWalkingImage
  ],
  [KATYATANYA]: [mamaKatyaPictureImage, katyaMamaSDImage, mamaKatyaCatPicture],
  [LEOTANYA]: [mamaLeoHawaiiImage, mamaLeoAirportImage],
  [IGORKASSKATYA]: [kassPapaKatyaNorthamptonImage],
  [IGORKASSLEO]: [leoPapaKassHawaiiImage, leoPapaKassHawaiiGameImage, leoPapaKassHawaiiShipImage],
  [IGORKASSTANYA]: [
    papaMamaKassThanksgivingImage, papaMamaKassBostonImage, kassMamaPapaThanksgivingImage, mamaKassPapaBeachImage,
    papaMamaKassOtherThanksgivingImage, kassMamaPapaPeachesImage, mamaPapaKassHikingImage, kassPapaMamaSydImage,
    kassMamaPapaOtherPeachesImage
  ],
  [IGORKATYALEO]: [leoPapaKatyaKbbqImage, leoPapaKatyaSDImage, leoKatyaPapaSDImage],
  [IGORKATYATANYA]: [
    papaKatyaTanyaImage, katyaMamaPapaPlaneImage, katyaMamaPapaSecondPlaneImage, papaMamaKatyaHikeImage,
    mamaPapaKatyaMountainImage, katyaPapaMamaBeachImage, papaKatyaMamaPhoneImage,
  ],
  [IGORLEOTANYA]: [mamaPapaLeoRaceImage, mamaPapaLeoMaineImage, leoMamaPapaSinkImage],
  [KASSKATYALEO]: [leoKatyaKassFarAwayImage, kassLeoKatyaPeaceImage, leoKatyaKassPeaceImage],
  [KASSKATYATANYA]: [kassMamaKatyaPeaceImage],
  [KASSLEOTANYA]: [], // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  [KATYALEOTANYA]: [], // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  [IGORKASSKATYALEO]: [], // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  [IGORKASSKATYATANYA]: [
    notLeoInSanDiegoImage, kassPapaMamaKatyaMassImage, mamaKatyaKassPapaImage, mamaKatyaKassPapaSmilesImage,
  ],
  [IGORKASSLEOTANYA]: [
    mamaPapaKassLeoMaineImage, mamaPapaKassLeoXmasImage, mamaPapaKassLeoHawaiiImage,
    mamaPapaKassLeoTunnelImage, papaKassLeoMamaHawaiiImage, leoPapaKassMamaSDImage,
  ],
  [IGORKATYALEOTANYA]: [
    joshTreeImage, leoPapaKatyaMamaImage, katyaMamaLeoPapaPicturesImage, mamaKatyaPapaLeoSDImage,
  ],
  [KASSKATYALEOTANYA]: [], // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  [IGORKASSKATYALEOTANYA]: [
    familyGradImage, familyThaiDinnerImage, familyEscapeRoomImage, familyBetterThaiDinnerImage, familySDImage,
    familyKassSelfie, bestFamilyImage, secondBestFamilyImage, familyCursedImage
  ],
  [SYD]: [
    sydBagImage, sydCuteImage, sydMovingImage, kassPapaMamaSydImage, sydWhiskersImage, sydLaptopImage,
    papaSydImage, kassKatyaSydImage, papaMamaSydImage, papaSydPhoneImage, papaSydYogurtImage, mamaSydPunchPicture,
    kassSydSkypePicture, kassSydDoorPicture, kassSydWavingImage, sydFriedImage, papaSydHelpingImage, kassSydCuteImage
  ],
};

/**
 * If there is not an image with the exact members, we increase the size of the potential images (to include an extra
 * person).
 *
 * @param members
 */
const getBioImages = (members: Member[]): string[] => {
  let bioImages: string[] = [];
  let memberGroups: Member[][] = [members];

  while (bioImages.length === 0) {
    const newMemberGroups: Member[][] = [];
    for (let i = 0; i < memberGroups.length; i++) {
      const memberGroup = memberGroups[i];
      for (let j = 0; j < humanFamily.length; j++) {
        const member = humanFamily[j];
        if (!memberGroup.includes(member)) {
          newMemberGroups.push(members.concat([member]));
        }
      }
    }

    for (let i = 0; i < memberGroups.length; i++) {
      bioImages.push(...BIO_IMAGES[getMembersString(memberGroups[i])]);
    }

    memberGroups = newMemberGroups;
  }

  return randomize(bioImages);
};

export const getBio = (members: Member[]): Bio => {
  const membersString = getMembersString(members);

  return {
    name: getRandom(BIO_NAMES[membersString]),
    description: getRandom(BIO_DESCRIPTIONS[membersString]),
    images: getBioImages(members),
  };
};
