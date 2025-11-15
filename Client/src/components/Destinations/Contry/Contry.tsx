import { useSearchParams } from "react-router-dom"
const Contry = () => {
    const [searchParams] = useSearchParams();
    const country = searchParams.get("country");
  return (
    <section className="h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">Country Name: {country}</h1>
    </section>
  )
}

export default Contry