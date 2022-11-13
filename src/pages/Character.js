import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Character() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState();
  const getSpecificCharacter = (id) => {
    axios
      .get(`https://swapi.dev/api/people/${id}`)
      .then((response) => {
        setCharacter(response?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getSpecificCharacter(id);
  }, [id]);
  return (
    <div>
      <button onClick={() => navigate(-1)}> Back </button>
      {character?.name}
    </div>
  );
}
