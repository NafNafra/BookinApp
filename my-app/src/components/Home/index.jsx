// import './Home.scss'
import Intro from './Intro';
import Presentation from './Presentation';
import Trending from './Trending';

const Home = () => {
  return (
    <div className="Home">
      <Intro/>
      <Presentation/>
      <Trending/>
    </div>
  );
}

export default Home;