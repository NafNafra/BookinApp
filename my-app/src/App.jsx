import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Register from './components/register'
import Home from './pages/Home'
import Login from './components/login'
import Person from './shortcut/person'
import Prospectus from './components/prospectus'
import BookingPage from './components/booking_page';
import Booking_page from './components/book_with_data';
import Calendar from './shortcut/calendar';
import Details from './components/details';
import ReactCalendar from './shortcut/ReactCalendar';
import Room from './shortcut/room_carte'
import Next from './shortcut/next'
import Favorites from './components/favorite';
import MyReservations from './components/MyReservations';
import BookDetail from './components/BookDetail'
import BookModify from './components/BookModify'
import { AuthProvider } from './service/AuthContext';
import Account from './components/Account'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/person' element={<Person />} />
            <Route path='/carte' element={<Prospectus />} />
            <Route path='/booking/:room_id' element={<BookingPage />} />
            <Route path='/bookit/:id_bp' element={<Booking_page />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/details/:room_id' element={<Details />} />
            <Route path='/mycalendar' element={<ReactCalendar />} />
            <Route path='/s' element={<Next />} />
            <Route path='/room' element={<Room />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/myreservations' element={<MyReservations />} />
            <Route path='/bookingdetail' element={<BookDetail />} />
            <Route path='/bookingmodify' element={<BookModify />} />
            <Route path='/accountdetail' element={<Account />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
