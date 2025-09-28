import { useNavigate } from 'react-router-dom';


function Person() {

  const navigate = useNavigate();
  return (

    <>
      <div id="circle" className='circle' onClick={() => navigate("/")} >
        <span className='head'></span>
        <span className='body'></span>
      </div>

      <div className='triangle'>      </div>
      <div className='circle'>
        <div className='fleche'><div className='home'></div></div>
      </div>

      <div className='disposition'>
        <div className='theatre'>
          <div className='front'></div>
          <div className='desk'>
            {/* <div>{cally(1)}</div> */}
            <div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div>
          </div>
        </div>

        <div className='theatre'>
          <div className='front'></div>
          <div className='column'>
            <div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div>
          </div>
          <div className='column'>
            <div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div>
          </div>
          <div className='column'>
            <div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div><div className='eachDesk'></div>
          </div>

          <div>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default Person;


