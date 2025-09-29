// import './Home.scss'
import Intro from './Intro';
import Presentation from './Presentation';
import Trending from './Trending';
import MostVisited from './MostVisited';

const Home = () => {
  return (
    <div className="Home">
      <Intro/>
      <Presentation/>
      <Trending/>
      <MostVisited/>
    </div>
  );
}

export default Home;