// import './Home.scss'
import Intro from '../../components/Home/Intro';
import Presentation from '../../components/Home/Presentation';
import Trending from '../../components/Home/Trending';
import MostVisited from '../../components/Home/MostVisited';
import Promo from '../../components/Home/Promo';

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