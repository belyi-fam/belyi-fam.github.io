import FrontPage from '@/app/pages/FrontPage';
import BioPage from '@/app/pages/BioPage';
import BlurBackground from '@/app/components/BlurBackground';

/*

* Family Stats/Introduction Page
  *
* Locations of where everyone is
* How many places we've been to
* Graphical Representations of things
* Music/Media
  *
* Photo Gallery
* Soccer
  * Premier League/Other League follower
  * Watch Together Party
  * Game out of the soccer scores
* Food
  * Recipe Book
* Little Browser Games
* AI Project?
  * Generate recommendations for recipes/music
* Escape Rooms
  * Cool puzzle?

With this non-static deployment, we can have more full app features, like persisting data and stuff

 */

const MainPage = () => {
  return (
    <div className="flex flex-col w-full relative">
      <BlurBackground />
      <FrontPage />
      <BioPage />
      {/*<WidgetPage />*/}
      { /* Blobs Background */ }
    </div>
  )
};

export default MainPage;
