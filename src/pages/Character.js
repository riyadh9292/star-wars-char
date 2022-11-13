import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Character() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState();
  const [films, setFilms] = useState([]);
  const [homeWorld, setHomeWorld] = useState();
  const [loading, setLoading] = useState(false);
  const getSpecificCharacter = (id) => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/people/${id}`)
      .then((response) => {
        setCharacter(response?.data);
        setLoading(false);
        // getting home wrold data
        axios
          .get(response?.data?.homeworld)
          .then((response) => setHomeWorld(response?.data))
          .catch((e) => console.log(e));

        // getting all films
        const films = response?.data?.films?.map((film) =>
          axios.get(`${film}`)
        );
        Promise.all(films)
          .then((res) => setFilms(res))
          .catch((e) => console.log(e)); // This Promise resolves when all individual promise resolve, or rejects if any single one rejects.
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  useEffect(() => {
    getSpecificCharacter(id);
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-red-300 text-5xl">Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center">
      <div className="px-10 md:px-20 2xl:px-40 space-y-[30px]">
        <div className="flex w-full justify-center">
          <button
            className="bg-slate-400 text-white px-10 py-4 rounded-lg hover:text-slate-400 hover:bg-slate-100 text-lg font-semibold"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        <div>
          <p className="text-4xl">
            Name:{" "}
            <span className="text-red-300 font-semibold ml-2">
              {character?.name}
            </span>
          </p>
          <p className="text-3xl">
            Eye Color:
            <span className="text-red-300 font-semibold ml-2">
              {character?.eye_color}
            </span>
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold  pt-20 pb-4">Home World</p>
          <p className="text-red-300">
            Name: <span className="font-semibold"> {homeWorld?.name}</span>
          </p>
          <p className="text-red-300">
            Climate:{" "}
            <span className="font-semibold"> {homeWorld?.climate}</span>
          </p>
          <p className="text-red-300">
            Gravity:{" "}
            <span className="font-semibold"> {homeWorld?.gravity}</span>
          </p>
          <p className="text-red-300">
            Population:{" "}
            <span className="font-semibold"> {homeWorld?.population}</span>
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold  py-20">Films</p>
          {films.map((film, key) => {
            return (
              <div
                className="p-3 border border-[#e6e6e6] flex items-start gap-4"
                key={key}
              >
                <p>{key + 1}.</p>
                <div>
                  {" "}
                  <p className="text-red-300 font-semibold">
                    {film?.data?.title}
                  </p>
                  <p>directed by {film?.data?.director}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
