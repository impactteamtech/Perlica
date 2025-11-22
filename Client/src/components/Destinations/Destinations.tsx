import React from 'react'
import MainSection from './MainSection'
import PopularDestinations from './PopularDestinations'
import FeaturedDestinations from './FeaturedDestinations'

const Destinations = (): React.JSX.Element => {
  return (
    <>
      <MainSection />
      <PopularDestinations />
      <FeaturedDestinations /> 
    </>
  )
}

export default Destinations