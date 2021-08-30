/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';

const MyPokemon = ({ myPokemonCallback }) => {

    const [pokemonList, setPokemonList] = useState(null);

    useEffect(() => {
        setPokemonList(JSON.parse(window.localStorage.getItem("my_pokemon")));
    }, []);

    const callback = (pokemonName) => {
        myPokemonCallback("pokemonDetails", pokemonName);
    }

    const pokemonButtonStyle = css`
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        background-color: white;
        font-size: 20px;
        color: #DC0A2D;
        font-weight: 700;
        cursor: pointer;
        :hover {
            background-color: #FECD31;
        }
    `

    const pokemonNameStyle = css`
        font-size: 14px;
        color: black;
        font-weight: 500;
    `

    const PokemonButton = ({ pokemon }) => (
        <button
            css={pokemonButtonStyle}
            onClick={() => { callback(pokemon.name) }}
        >
            <div>
                {pokemon.nickname}
            </div>
            <div css={pokemonNameStyle}>
                {pokemon.name}
            </div>
        </button>
    )


    return (
        <div>
            <h1>My Pokemon</h1>
            {
                (pokemonList === null || pokemonList?.length === 0) ?
                    <div>No Pokemon have been caught. Go catch some!</div>
                :
                <div>
                    {pokemonList?.map((pokemon) => (
                        <PokemonButton pokemon={pokemon} />
                    ))}
                </div>
            }
        </div>
    );
}

export default MyPokemon;
