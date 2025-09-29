// import './Home.scss'
import Intro from './Intro';
import Presentation from './Presentation';
import Trending from './Trending';
import MostVisited from './MostVisited';
import Promo from './Promo';

const Home = () => {
  return (
    <div className="Home">
      <Intro/>
      <Presentation/>
      <Trending/>
      <MostVisited/>
      <Promo/>
    </div>
  );
}

export default Home;