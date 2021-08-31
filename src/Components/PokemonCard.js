/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useWindowDimensions } from '../Utils/Utility';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { indigo, red } from '@material-ui/core/colors';

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
        word-break: break-all;
    `

    const cardResponsiveStyle = 
    width < 520 ? 
        (css`
            width: 100%;
        `) 
    : 
        (css`
            min-width: 200px;
        `)
    
    const countStyle = css`
        font-size: 14px;
        margin: 5px 0px;
    `

    const pokemonNicknameStyle = css`
        color: #828282;
        font-size: 24px;
        font-weight: 700;
    `

    const pokemonNameStyle = css`
        margin: 5px 0px;
    `

    const BlueButton = withStyles((theme) => ({
        root: {
            'border-color': indigo[700],
            '&:hover': {
                color: indigo[50],
                backgroundColor: indigo[900],
            },
        },
    }))(Button);

    const RedButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(red[600]),
            backgroundColor: red[600],
            '&:hover': {
                backgroundColor: red[900],
            },
        },
    }))(Button);

    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(0.5),
        },
    }));

    const classes = useStyles();

    return (
        <div css={[pokemonButtonStyle, cardResponsiveStyle]}>
            {
                pokemon.nickname ?
                    (<div css={pokemonNicknameStyle}>
                        {pokemon.nickname}
                    </div>)
                : (<></>)
            }
            {
                pokemon.name ?
                    (<div css={pokemonNameStyle}>
                        {pokemon.name}
                    </div>)
                : (<></>)
            }
            {
                countFunction ?
                    (<div css={countStyle}>
                        {`caught: ${countFunction(pokemon.name)}`}
                    </div>)
                : (<></>)
            }
            {
                detailsFunction ?
                    <BlueButton size="small" variant="outlined" color="primary" className={classes.margin} onClick={() => { detailsFunction(pokemon.name) }} >
                        Details
                    </BlueButton>
                : (<></>)
            }
            {
                releaseFunction ?
                    <RedButton size="small" variant="contained" color="primary" className={classes.margin} onClick={() => { releaseFunction(pokemon.name, index) }} >
                        Release
                    </RedButton>
                : (<></>)
            }
        </div>
    );
}

export default PokemonCard;
