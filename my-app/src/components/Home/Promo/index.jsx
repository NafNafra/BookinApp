import './Promo.scss'

const Promo = () => {
  return (
    <div className="promo">
      <div className="destination">
        <div className="intro">Obtener des promotions pour des prix moins chers</div>
        <div className="voir"><div>Voir tout</div><div className="voir-tout" /></div>
      </div>
      <div className="promos">
        <div className="carte">
          <div className="info">
            <div className="rank"></div>
            <div className="part-1">Gagnez des reductions extras pour la location dans l'hotel Azure</div>
            <div className="part-2">50 %</div>
            <div className="part-3">avec termes et conditions</div>
          </div>
          <div className="duree"> Valide du 14 au 20 Octobre 2025</div>
        </div>

        <div className='carte'>
          <div className="info">
            <div className="rank"></div>
            <div className="part-1">Gagnez des reductions extras pour la location dans l'hotel Azure</div>
            <div className="part-2">50 %</div>
            <div className="part-3">avec termes et conditions</div>
          </div>
          <div className="duree"> Valide du 14 au 20 Octobre 2025</div>
        </div>
      </div>

    </div>
  )
}

export default Promo;