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
import { Suspense, lazy } from 'react';
const Packages = lazy(() => import('./components/Packages/Packages'));

const CarsLayout = lazy(() => import('./components/Cars/CarsLayout'));
const Cars = lazy(() => import('./components/Cars/Cars'));
const ExistingCars = lazy(() => import('./components/Cars/ExistingCars'));

const HotelSearchPage = lazy(() => import('./components/hotels/HotelSearchPage'));

const DestinationsLayout = lazy(() => import('./components/Destinations/DestinationsLayout'));
const Destinations = lazy(() => import('./components/Destinations/Destinations'));
const Country = lazy(() => import('./components/Destinations/Country/Country'));
function App() {
  return (
  <>
  <div className="background-color">
    <Suspense fallback={null}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>

          <Route path="packages" element={<Packages />} />

          <Route path='cars' element={<CarsLayout />}>
            <Route index element={<Cars />} />
            <Route path="existingCars" element={<ExistingCars />} />
          </Route>

          <Route path="hotels" element={<HotelSearchPage />} />

          <Route path="destinations" element={<DestinationsLayout />}>
            <Route index element={<Destinations />} />
            <Route path="countries" element={<Country />} />
          </Route>
        </Route>
        <Route path='*' element={<h1 className='text-5xl font-bold text-black w-full h-screnn flex items-center justify-center'>404 Not Found</h1>}/>
      </Routes>
    </Suspense>
  </div>
</>
)
}
export default App
