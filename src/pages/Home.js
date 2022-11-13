import React, { useState } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const [totalItems, setTotalItems] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [activePageSearch, setActivePageSearch] = useState(1);
  const [itemsSinglePage, setItemsSinglePage] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchedItem, setSearchedItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCharacterSearch = (searchValue) => {
    setSearchValue(searchValue);
    if (searchValue === "" || searchedItem?.length === 0) {
      setActivePageSearch(1);
    }
    axios
      .get(
        `https://swapi.dev/api/people?search=${searchValue}&&page=${activePageSearch}`
      )
      .then((response) => {
        setTotalItems(response?.data?.count);
        setSearchedItem(response?.data?.results);
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/people/?page=${activePage}`)
      .then((response) => {
        console.log(response.data);
        setTotalItems(response?.data?.count);
        setItemsSinglePage(response?.data?.results);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [activePage]);
  React.useEffect(() => {
    handleCharacterSearch(searchValue);
  }, [activePageSearch]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="px-40 space-y-[30px]">
      <div className="flex w-full justify-end  mt-20 ">
        <input
          className="w-80 px-4 h-10 border border-[#e6e6e6] rounded focus:outline-none"
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleCharacterSearch(e.target.value);
          }}
          placeholder="search here...."
        />
      </div>
      {searchValue ? (
        <div className="grid grid-cols-5 gap-4">
          {" "}
          {searchedItem?.map((item) => (
            <CharacterCard item={item} key={item?.url} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {itemsSinglePage?.map((item) => (
            <CharacterCard item={item} key={item?.url} />
          ))}
        </div>
      )}
      {searchValue && searchedItem.length === 0 && (
        <div className=" flex w-full justify-center text-red-600">
          No character matched
        </div>
      )}
      {searchValue === "" ? (
        <div>
          <Pagination
            total={Math.ceil(totalItems / 10)}
            active={activePage}
            setActive={setActivePage}
          />
        </div>
      ) : (
        <div>
          <Pagination
            total={Math.ceil(totalItems / 10)}
            active={activePageSearch}
            setActive={setActivePageSearch}
          />
        </div>
      )}
    </div>
  );
}
