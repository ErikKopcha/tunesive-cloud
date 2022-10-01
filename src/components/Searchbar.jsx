import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate(`/search/${searchTerm}`);
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 text-gray-400 focus-within:text-gray-600"
      autoComplete="off"
    >
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-grow justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
          autoComplete="off"
          name="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  )
};

export default Searchbar;
