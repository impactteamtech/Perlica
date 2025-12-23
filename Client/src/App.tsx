/* ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                      DEV CARD (yp)                 ┃
   ┣━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Initials ┃ Use // [yp] to tag any inline changes   ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Stack    ┃ TS → JS → Tailwind → React              ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Cadence  ┃ Weekly tasks · Weekly review pre-merge  ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Cleanup  ┃ Remove ALL comments at completion       ┃
   ┣━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
   ┃ Commits  ┃ feat(scope): message  [yp]              ┃
   ┗━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Layout/Home';
import Destinations from './components/Destinations/Destinations';
import Packages from './components/Packages/Packages';
import Cars from './components/Cars/Cars';
import Stays from './components/Stays/Stays';
import DestinationsLayout from './components/Destinations/DestinationsLayout';
import Country from './components/Destinations/Country/Country';
import ExistingCars from './components/Cars/ExistingCars';
import CarsLayout from './components/Cars/CarsLayout';
import HotelSearchPage from './components/hotels/HotelSearchPage';
function App() {
  return (
   <>
  <div className="background-color">
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="destinations" element={<Destinations />} >
          <Route index element={<Destinations />} />
          <Route path="country" element={<Country />} />
  
        </Route>
        <Route path="packages" element={<Packages />} />
        <Route path='cars' element={<CarsLayout />}>
          <Route index element={<Cars />} />
          <Route path="existingCars" element={<ExistingCars />} />
        </Route>
        <Route path="hotels" element={<HotelSearchPage />} />
      </Route>
    </Routes>
  </div>
</>
)
}
export default App
