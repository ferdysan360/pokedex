/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useWindowDimensions } from '../Utils/Utility';

const PokemonCard = ({ pokemon, countFunction, detailsFunction, releaseFunction, index }) => {

    const { height, width } = useWindowDimensions();

    const pokemonButtonStyle = css`
        display: flex;
        justify-content: center;
        align-items: space-evenly;
        flex-direction: column;
        min-height: 100px;
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        background-color: white;
        box-shadow: 5px 10px 18px #888888;
        font-size: 20px;
    `

    const cardResponsiveStyle = 
    width < 520 ? 
        (css`
            min-width: 120px;
            min-height: 75px;
            font-size: 16px;
        `) 
    : 
        (css`
            min-width: 200px;
        `)
    
    const countStyle = css`
        font-size: 14px;
        margin: 5px 0px;
    `

    const detailsButtonStyle = css`
        margin: 3px 0px;
    `

    return (
        <div css={[pokemonButtonStyle, cardResponsiveStyle]}>
            {
                pokemon.nickname ?
                    (<div>
                        {pokemon.nickname}
                    </div>)
                : (<></>)
            }
            {pokemon.name}
            {
                countFunction ?
                    (<div css={countStyle}>
                        {`caught: ${countFunction(pokemon.name)}`}
                    </div>)
                : (<></>)
            }
            {
                detailsFunction ?
                    <button css={detailsButtonStyle} onClick={() => { detailsFunction(pokemon.name) }}>
                        Details
                    </button>
                : (<></>)
            }
            {
                releaseFunction ?
                    <button css={detailsButtonStyle} onClick={() => { releaseFunction(pokemon.name, index) }}>
                        Release
                    </button>
                : (<></>)
            }
        </div>
    );
}

export default PokemonCard;
