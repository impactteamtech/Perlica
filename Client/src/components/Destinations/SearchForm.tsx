import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchForm = () => {
  const contriesOptions:string[] = [
    "kenya",
    "zanzibar",
    "uganda",
  ];
  const navigate = useNavigate();
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contryName = formData.get("contryName");
    const lowercontryName = (contryName as string).toLowerCase();
    if(contriesOptions.includes(lowercontryName))
    {
      navigate(`/destinations/country?country=${contryName}`);
    }      
    else{
      alert("Please select a valid country from: kenya, zanzibar or uganda.");
    }
  }
  return (
      <form 
      onSubmit={handleSearch} 
      className='flex w-180 absolute bottom-25  bg-white rounded-full p-2 gap-2 items-center'>
        <input 
          list='countries'
          name="contryName"
          required
          className='w-[80%] focus:border-none  focus:ring-0 bg-transparent outline-none border-none'
          type="text" 
          placeholder='Enter the name of Country...'/>
        <datalist id='countries'>
          { 
            contriesOptions.map((country, index)=> (
              <option key={index} value={country} />   ))
          }
        </datalist>
        <button
          type="submit"
          className='bg-black w-[20%] cursor-pointer hover:bg-black/85 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2'
        ><IoSearch />Search</button>
    </form>
  )
}

export default SearchForm