/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../Components/PokemonCard';

const PokemonList = ({pokemonListCallback}) => {

    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [pokemonList, setPokemonList] = useState(null);
    const [myPokemonList, setMyPokemonList] = useState(null);

    const flexPokemonList = css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin: 0px 0px 20px 0px;
    `
    
    useEffect(() => {
        axios.get(url)
        .then(result => {
            setPrev(result.data.previous);
            setNext(result.data.next);
            setPokemonList(result.data.results);
        })
        .catch(error => {
            console.log(error);
        })

        setMyPokemonList(JSON.parse(window.localStorage.getItem("my_pokemon")));
    }, [url]);

    const callback = (pokemonName) => {
        pokemonListCallback("pokemonDetails", pokemonName);
    }

    const detailsPokemon = ( pokemonName ) => {
        callback(pokemonName);
    }

    const countPokemon = ( pokemonName ) => {
        if (myPokemonList && myPokemonList?.length !== 0) {
            var count = 0;
            for (let i = 0; i < myPokemonList?.length; i++) {
                if (myPokemonList[i].name === pokemonName) {
                    count++;
                }
            }

            return count;
        }
        else {
            return 0;
        }
    }

    return (
        <div>
            <h1>Pokemon List</h1>
            <div css={flexPokemonList}>
                {pokemonList?.map((pokemon) => (
                    <PokemonCard pokemon={pokemon} countFunction={countPokemon} detailsFunction={detailsPokemon} />
                ))}
            </div>
            <div>
                <button disabled={prev === null} onClick={() => { setUrl(prev) }}>Prev</button>
                <button disabled={next === null} onClick={() => { setUrl(next) }}>Next</button>
            </div>
        </div>
        
    );
}

export default PokemonList;
