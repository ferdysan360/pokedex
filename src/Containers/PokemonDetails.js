/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonDetails = ({ pokemonName }) => {

    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const [pokemonInfo, setPokemonInfo] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(result => {
                console.log(result.data);
                setPokemonInfo(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const baseStyle = css`
        display: inline-block;
        margin: 5px;
        padding: 4px 10px;
        border-radius: 14px;
        font-weight: 500;
    `

    const typeStyle = css`
        background-color: #FECD31;
    `

    const moveStyle = css`
        background-color: #17147E;
        color: white;
    `

    const catchButtonStyle = css`
        margin: 10px;
        padding: 10px;
        // border-color: #17147E;
        border-radius: 8px;
        background-color: #FECD31;
        font-size: 20px;
        font-weight: 700;
        color: #17147E;
        cursor: pointer;
        :hover {
            background-color: #E3AD00;
        }
    `

    const flex = css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    `

    const CatchButton = ({ pokemon }) => (
        <button
            css={catchButtonStyle}
            onClick={() => { }}
        >
            Catch!
        </button>
    )


    return (
        <div>
            <h1>Pokemon Details</h1>
            <div css={flex}>
                <div>
                    <img src={pokemonInfo?.sprites?.other["official-artwork"]?.front_default} height="300" width="300" alt="pokemon"/>
                </div>
                <div>
                    <h2>{pokemonInfo?.name}</h2>
                    <br/>
                    <CatchButton />
                </div>
            </div>
            <div>
                {pokemonInfo?.types?.map((type) => (
                    <div css={[baseStyle, typeStyle]}>{type?.type?.name}</div>
                ))}
                <br/>
                {pokemonInfo?.moves?.map((move) => (
                    <div css={[baseStyle, moveStyle]}>{move?.move?.name}</div>
                ))}
            </div>
        </div>

    );
}

export default PokemonDetails;
