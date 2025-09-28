const Header = () => {
  return (
    <div className="header">
      <div className="part-1">
        <div className="logo">
          <div className="logoImage"></div>
          <div className="name">MeetEo</div>
        </div>
        <div className="link">
          <ul>
            <li>Hotel</li>
            <li>Meeting</li>
            <li>Ball </li>
            <li>Rooms</li>
            <li>Rental</li>
          </ul>
        </div>
      </div>
      <div className="part-2">
        <input type="text" name="search" id="search" />
      </div>
      <div className="part-3">
        <div className="language">EN</div>
        <div className="login">Log In </div>
        <div className="signup">Sign Up</div>
      </div>
    </div>
  )
}