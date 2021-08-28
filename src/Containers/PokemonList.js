/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonList = ({pokemonListCallback}) => {

    const [count, setCount] = useState(0);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [pokemonList, setPokemonList] = useState(null);
    
    useEffect(() => {
        axios.get(url)
        .then(result => {
            setCount(result.data.count);
            setPrev(result.data.previous);
            setNext(result.data.next);
            setPokemonList(result.data.results);
        })
        .catch(error => {
            console.log(error);
        })
    }, [url]);

    const callback = (pokemonName) => {
        pokemonListCallback("pokemonDetails", pokemonName);
    }

    const pokemonButtonStyle = css`
        margin: 10px;
        padding: 10px;
        // border: 1px solid black;
        border-radius: 8px;
        background-color: white;
        font-size: 20px;
    `

    const PokemonButton = ({ pokemon }) => (
        <button 
            css={pokemonButtonStyle}
            onClick={() => {callback(pokemon.name)}}    
        >
            {pokemon.name}
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
