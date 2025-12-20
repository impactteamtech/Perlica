import React from 'react'
import CarsMainSection from './CarsMainSection'
import CarsSecondSection from './CarsSecondSection'
import CarsFeatures from './CarsFeatures'
import CarsCTA from './CarsCTA'
const Cars = (): React.JSX.Element => {
  return (
    <>
      <CarsMainSection />
      <CarsSecondSection />
      <CarsFeatures />
      <CarsCTA />
    </>
  )
}

export default Cars