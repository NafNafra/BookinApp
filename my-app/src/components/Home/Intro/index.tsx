import './Intro.scss'

const Intro = () => {
  return (
    <div className='Intro'>
      <h1 className="titre">Les meilleures salles pour vos activites professionnelles et festives </h1>
      <div className="search">
        <div className='search-bar'>
          <div className="bar">
            <div className='titre'>Location</div>
            <div className="input">
              <div className="location" />
              <input type="text" />
            </div>
          </div>
          <div className="bar">
            <div className='titre'>Check-in and Check-out Date</div>
            <div className="input">
              <div className="date" />
              <input type="text" />
            </div>
          </div>
          <div className="bar">
            <div className='titre'>Guests and Rooms</div>
            <div className="input">
              <div className="guest" />
              <input type="text" />
            </div>
          </div>
        </div>
        <div className='filter'>
          <div className="filters">
            <div className="titre">Filtrer:</div>
            <div className="choix">
              <button>Hotels</button>
              <button>Meeting</button>
              <button>Festivity</button>
            </div>
          </div>
          <div className="search-btn"><button>Search</button></div>
        </div>
      </div>
    </div>
  );
}

export default Intro;