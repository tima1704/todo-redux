import React from "react";
import cls from "./index.module.css";
import { Module } from "../Api";

const MAIN_URL = "https://pokeapi.co/api/v2/pokemon/";

export const Pokemon = () => {

  const [url, setUrl] = React.useState(MAIN_URL);
  const [pokemon, setPokemon] = React.useState([]);
  const [next, setNext] = React.useState();
  const [previos, sePrevios] = React.useState();

  const pokeFunc = () => {
    try {
      Module.GetPokemonBody(url, (res) => {
        setNext(res.next);
        sePrevios(res.previous);
        Module.GetPokemon(res.results, setPokemon);
      });
    } catch (e) {
      throw e
    }
  };

  React.useEffect(() => {
    pokeFunc();
  }, [url]);

  return (
    <div className={cls.container_pokemon}>
      {pokemon?.map((item) => (
        <div>
          <p>key {item.id}</p>
          <p key={item.id}>{item.name}</p>
        </div>
      ))}
      {previos && (
        <button
          onClick={() => {
            setPokemon([]);
            setUrl(previos);
          }}
        >
          prev
        </button>
      )}
      <button
        onClick={() => {
          setPokemon([]);
          setUrl(next);
        }}
      >
        next
      </button>
    </div>
  );
};