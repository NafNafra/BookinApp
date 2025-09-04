  // import logo from './logo.svg';
import '../App.css';
// import '../style/person.css';
import { useNavigate } from 'react-router-dom';


function Person() {

  const navigate = useNavigate();
  // function cally(d) {
  //   var chara = <div className='eachDesk'></div>;
  //   while (d < 5) {
  //     d++
  //     console.log(d)
  //     return (<>{chara}</>);

  //     // chara = <div className='eachDesk'></div> 
  //   }

  // }
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


