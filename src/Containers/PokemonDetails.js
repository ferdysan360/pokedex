/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const PokemonDetails = ({ pokemonName }) => {

    const [url] = useState(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [openCaptured, setOpenCaptured] = useState(false);
    const [capturedMessage, setCapturedMessage] = useState(null);
    const [severity, setSeverity] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(result => {
                setPokemonInfo(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [url]);

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

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const findNickname = (nickname, initialValue) => {
        var isFound = false;

        for (let i = 0; i < initialValue.length; i++) {
            if (initialValue[i].nickname === nickname) {
                isFound = true;
                break;
            }
            else {
                continue;
            }
        }

        return isFound;
    }

    const catchPokemon = (nickname, pokemon) => {
        var initialValue = JSON.parse(window.localStorage.getItem("my_pokemon"));
        
        if (!initialValue) {
            initialValue = [];
        }

        while(findNickname(nickname, initialValue)) {
            nickname = prompt("Nickname already exist. please choose a different nickname:", nickname);
            if (nickname === null || nickname === "") {
                setOpenCaptured(false);
                setCapturedMessage("Pokemon slipped away... Try Again!");
                setSeverity("error");
                setOpenCaptured(true);
                return;
            }
        }

        var newPokemon = {
            nickname: nickname,
            name: pokemon?.name
        };

        initialValue.push(newPokemon);

        window.localStorage.setItem("my_pokemon", JSON.stringify(initialValue));

        setCapturedMessage("Pokemon successfully saved!");
        setSeverity("success");
        setOpenCaptured(true);
    }

    const CatchButton = ({ pokemon }) => (
        <button
            css={catchButtonStyle}
            onClick={() => {
                if (Math.round(Math.random()) === 1) {
                    let nickname = prompt("Pokemon Caught! Please enter your pokemon's nickname:", pokemon?.name);
                    if (nickname === null || nickname === "") {
                        setOpenCaptured(false);
                        setCapturedMessage("Pokemon slipped away... Try Again!");
                        setSeverity("error");
                        setOpenCaptured(true);
                    }
                    else {
                        catchPokemon(nickname, pokemon);
                    }
                }
                else {
                    setOpenCaptured(false);
                    setCapturedMessage("Pokemon slipped away... Try Again!");
                    setSeverity("error");
                    setOpenCaptured(true);
                }
            }}
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
                    <CatchButton pokemon={pokemonInfo}/>
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
            <Snackbar 
                open={openCaptured} 
                onClose={() => setOpenCaptured(false)} 
                autoHideDuration={4000}
            >
                <Alert onClose={() => setOpenCaptured(false)} severity={severity}>
                    {capturedMessage}
                </Alert>
            </Snackbar>
        </div>

    );
}

export default PokemonDetails;
