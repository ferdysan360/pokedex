/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonDetails = ({ pokemonName }) => {

    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    useEffect(() => {
        axios.get(url)
            .then(result => {
                console.log(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

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
            onClick={() => { }}
        >
            {pokemon.name}
        </button>
    )


    return (
        <div>
            <h1>Pokemon Details</h1>
            {pokemonName}
        </div>

    );
}

export default PokemonDetails;
