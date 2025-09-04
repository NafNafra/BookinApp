import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css'
 
// import Fullcalendar from 'fullcalendar/react';
// import dayGridPlugin from 'fullcalendar/daygrid'
// import Calen from 'fullcalendar'



const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// const rbc_button_link = document.querySelector('.rbc-button-link') //getElementsByClassName('rbc-button-link');
// rbc_button_link.onClick = function () {
//   alert("click");
// }


// rbc_button_link.addEventListener('click', echoL());

// function echoL(){
//   alert("rbc_button_link")
// }

const events = [
  {
    title: 'Réunion équipe',
    start: new Date(2025, 7, 14, 10, 0), // 14 mai 2025 à 10:00
    end: new Date(2025, 7, 14, 12, 0),
  },
  {
    title: 'Appel client',
    start: new Date(2025, 7, 15, 14, 30),
    end: new Date(2025, 7, 15, 15, 0),
  }
];

function CalendarCreate() {


  useEffect(() => {
    const buttons = document.querySelectorAll('button')

    const rbc_div = document.querySelector('.rbc-current')
    // rbc_div.addEventListener('mouseover', function(){console.log("dsjbdsj,bf,jds")})
    // console.log(rbc_month_view.innerHTML)
    // rbc_div.addEventListener('change', alert('change'))
    buttons.forEach((btt) => {
      btt.addEventListener('dblclick', function () { alert(this.innerHTML + 'orage') })
    })
    // console.log(rbc_div.innerHTML)

    // console.log("Nombre de boutons de calendrier"+ buttons.length)

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener('click', function () { alert(this.innerHTML) })
      })
    }
  }, [])

  function handleDateClick (ev) {
    // const text = event.target?.textContent?.trim()
    if (ev) {
      alert("Vous avez cliquer sur ")
    } else {
      alert("aucune contenu")
    }
  }

  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date());


  const messagesFr = {
    date: 'Day',
    time: 'Hour',
    event: 'Event',
    allDay: 'AllDay',
    work_week: 'Work week',
    day: 'Day',
    month: 'Month',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    today: "Today",
    // agenda: 'Agenda',
    // noEventsInRange: 'Aucun événement sur cette période.',
    // showMore: total => `+ ${total} événement(s) supplémentaire(s)`,

  };

  // const handleDateClick = (slotInfo) => {
  //   const clickedDate = slotInfo.start;
  //   const formatedDate = format(clickedDate, 'yyyy-MM-dd')
  //   console.log(clickedDate)
  //   alert('Date selectionnee : ' + formatedDate);
  // }


  return (
    <div style={{ padding: '20px' }} className='cal'>
      <Calendar
        localizer={localizer}
        selectable
        // onSelectSlot={handleDateClick}
        // onSelecting={handleDateClick}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        // view={view}
        date={date}
        onNavigate={setDate}
        onView={setView}
        views={['month']}
        style={{ height: 340, width: 320 }}
        messages={messagesFr}
      // dateClick={handleDateClick}
      // onSelectEvent={(event) => {
      //   alert(`Titre : ${event.title}\nDébut : ${event.start}\nFin : ${event.end}`);
      // }}
      />
      <br />

      {/*<Fullcalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" dayClick={handleDateClick}/>*/}
      <div><button className='rbc-div'> comme1</button></div>
      <div><button className='rbc-div'> comme2</button></div>
      <div><button className='rbc-div'> comme3</button></div>
      <div><button className='rbc-div'> comme4</button></div>
      <div><button className='rbc-div'> comme5</button></div>
      <div><button className='rbc-div'> comme6</button></div>
      <div><button className='rbc-div'> comme7</button></div>
    </div>
  );
}

export default CalendarCreate;