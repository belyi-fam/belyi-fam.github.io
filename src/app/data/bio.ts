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
} from '../types';
import { getRandom } from '../util/random';
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
  papaKatyaBrightImage,
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
  sydWhiskersImage
} from '../img';
import { StaticImageData } from 'next/image';

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
  [KASSKATYA]: ['The Queer Kings'],
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
};

const BIO_DESCRIPTIONS: { [membersString: string]: string[] } = {
  [IGOR]: ['Papa is always hurting.'],
  [KASS]: [''],
  [KATYA]: [''],
  [LEO]: [''],
  [TANYA]: [''],
  [IGORKASS]: [''],
  [IGORKATYA]: [''],
  [IGORLEO]: [''],
  [IGORTANYA]: [''],
  [KASSKATYA]: [''],
  [KASSLEO]: [''],
  [KASSTANYA]: [''],
  [KATYALEO]: [''],
  [KATYATANYA]: [''],
  [LEOTANYA]: [''],
  [IGORKASSKATYA]: [''],
  [IGORKASSLEO]: [''],
  [IGORKASSTANYA]: [''],
  [IGORKATYALEO]: [''],
  [IGORKATYATANYA]: [''],
  [IGORLEOTANYA]: [''],
  [KASSKATYALEO]: [''],
  [KASSKATYATANYA]: [''],
  [KASSLEOTANYA]: [''],
  [KATYALEOTANYA]: [''],
  [IGORKASSKATYALEO]: [''],
  [IGORKASSKATYATANYA]: [''],
  [IGORKASSLEOTANYA]: [''],
  [IGORKATYALEOTANYA]: [''],
  [KASSKATYALEOTANYA]: [''],
  [IGORKASSKATYALEOTANYA]: [''],
};

const BIO_IMAGES: { [membersString: string]: StaticImageData[] } = {
  [IGOR]: [
    papaSanDiegoImage, papaBeachImage, papaSydImage, papaHawaiiImage, papaAmesburyImage, papaBoulderImage,
    papaBridgeImage, papaRamenImage, papaKnifeImage, papaCharadesImage, papaStrawberryImage, papaSecondBeachImage,
    papaSmilingBeachImage, papaSydPhoneImage, papaSydYogurtImage, papaBlueberriesImage, papaSydHelpingImage
  ],
  [KASS]: [
    kassSanDiegoImage, kassCharadesImage, kassPeacePicture, kassSDPicture, kassSydSkypePicture, kassSydDoorPicture,
    kassMaineImage, kassSydWavingImage, kassSydCuteImage
  ],
  [KATYA]: [katyaSDHikeImage, katyaCatImage, katyaStuckImage, katyaGoatImage, katyaOculusImage],
  [LEO]: [leoHawaiiImage, leoRedRocksImage, leoMouthDeepImage],
  [TANYA]: [
    mamaHawaiiImage, mamaPumpkinImage, mamaBoredImage, mamaBridgeImage, mamaSydImage, mamaDonutImage,
    mamaSydPunchPicture
  ],
  [IGORKASS]: [
    kassPapaRocksImage, papaKassBostonImage, papaKassBeachImage, papaKassLookingImage, papaKassSecondBeachImage,
    kassPapaBeachImage, papaKassPeaceImage, kassPapaWoodsImage
  ],
  [IGORKATYA]: [
    papaKatyaBuildingImage, papaKatyaJTreeImage, katyaPapaHikeImage, katyaPapaSDHikeImage, katyaPapaGoatImage,
    papaKatyaHikingImage, papaKatyaBrightImage
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
    mamaKassCatEarsImage, mamaKatyaPictureImage, kassMamaBostonImage, kassMamaStrawberriesImage,
    kassMamaSecondStrawberriesImage, mamaKassBabyPicture
  ],
  [KATYALEO]: [
    leoKatyaPierImage, katyaLeoGradImage, katyaLeoSDHikeImage, katyaLeoAhahaImage,
    katyaLeoNoodleImage, katyaLeoMassHikeImage, katyaLeoSethImage, katyaLeoChefImage,
    katyaLeoBeachImage, katyaLeoSDPictureImage, katyaLeoTropicalImage, katyaLeoSDWalkingImage
  ],
  [KATYATANYA]: [katyaMamaSDImage, mamaKatyaCatPicture],
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
const getBioImage = (members: Member[]): StaticImageData => {
  let bioImage = undefined;
  let memberGroups: Member[][] = [members];

  while (bioImage === undefined) {
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

    memberGroups = newMemberGroups;

    const possibleBioImages = [];
    for (let i = 0; i < memberGroups.length; i++) {
      possibleBioImages.push(...BIO_IMAGES[getMembersString(memberGroups[i])]);
    }

    if (possibleBioImages.length > 0) {
      bioImage = getRandom(possibleBioImages);
    }
  }

  return bioImage;
};

export const getBio = (members: Member[]): Bio => {
  const membersString = getMembersString(members);

  return {
    name: getRandom(BIO_NAMES[membersString]),
    description: getRandom(BIO_DESCRIPTIONS[membersString]),
    image: getBioImage(members),
  };
};
