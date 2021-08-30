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

    const inlineDiv = css`
        display: inline-block;
        margin: 10px;
    `

    const pokemonButtonStyle = css`
        padding: 10px;
        border-radius: 8px;
        background-color: white;
        font-size: 20px;
        color: #DC0A2D;
        font-weight: 700;
        cursor: pointer;
        :hover {
            background-color: #E6E6E6;
        }
        z-index: 1;
    `

    const releaseButtonStyle = css`
        padding: 5px;
        border-radius: 8px;
        background-color: #DC0A2D;
        font-size: 16px;
        color: black;
        font-weight: 700;
        cursor: pointer;
        :hover {
            background-color: #FF0000;
        }
        z-index: 0;
    `

    const pokemonNameStyle = css`
        font-size: 14px;
        color: black;
        font-weight: 500;
    `

    const releasePokemon = ( pokemon, index ) => {
        if (window.confirm("Are you sure you want to release this pokemon?")) {
            var newPokemonList = pokemonList.slice();
            newPokemonList.splice(index, 1);

            window.localStorage.setItem("my_pokemon", JSON.stringify(newPokemonList));
            setPokemonList(newPokemonList);
        }
    }

    const ReleaseButton = ({ pokemon, index }) => (
        <button 
            css={releaseButtonStyle}
            onClick={() => { releasePokemon(pokemon, index) }}
        >
            Release
        </button>
    )

    const PokemonButton = ({ pokemon, index }) => (
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
                    {pokemonList?.map((pokemon, index) => (
                        <div css={inlineDiv}>
                            <div>
                                <PokemonButton pokemon={pokemon} index={index} />
                            </div>
                            <div>
                                <ReleaseButton pokemon={pokemon} index={index} />
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default MyPokemon;
