/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonList = ({pokemonListCallback}) => {

    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [pokemonList, setPokemonList] = useState(null);
    const [myPokemonList, setMyPokemonList] = useState(null);
    
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

    const pokemonButtonStyle = css`
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        background-color: white;
        font-size: 20px;
        cursor: pointer;
        :hover {
            background-color: #FECD31;
        }
    `

    const countStyle = css`
        font-size: 14px;
    `

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

    const PokemonButton = ({ pokemon }) => (
        <button 
            css={pokemonButtonStyle}
            onClick={() => {callback(pokemon.name)}}    
        >
            {pokemon.name}
            <div css={countStyle}>
                {`caught: ${countPokemon(pokemon.name)}`}
            </div>
        </button>
    )

    return (
        <div>
            <h1>Pokemon List</h1>
            {pokemonList?.map((pokemon) => (
                <PokemonButton pokemon={pokemon}/>
            ))}
            <div>
                <button disabled={prev === null} onClick={() => { setUrl(prev) }}>Prev</button>
                <button disabled={next === null} onClick={() => { setUrl(next) }}>Next</button>
            </div>
        </div>
        
    );
}

export default PokemonList;
