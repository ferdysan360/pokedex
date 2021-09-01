/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PokemonDetails = ({ pokemonName }) => {

    const [url] = useState(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [openCaptured, setOpenCaptured] = useState(false);
    const [capturedMessage, setCapturedMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [nickname, setNickname] = useState(pokemonName);
    const [isError, setIsError] = useState(false);
    const [helperText, setHelperText] = useState(null)

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

    const validateInput = (nickname) => {
        setNickname(nickname);
        if (nickname === null || nickname === "") {
            setIsError(true);
            setHelperText("Nickname cannot be empty.");
        }
        else {
            setIsError(false);
            setHelperText("");
        }

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

    const catchPokemon = (pokemon) => {
        var initialValue = JSON.parse(window.localStorage.getItem("my_pokemon"));

        if (!initialValue) {
            initialValue = [];
        }

        if (findNickname(nickname, initialValue)) {
            setIsError(true);
            setHelperText("Nickname already exist. please choose a different nickname.");
        }
        else {
            setIsError(false);
            setHelperText("");
            setOpenDialog(false);
            
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

    }

    const CatchButton = ({ pokemon }) => (
        <button
            css={catchButtonStyle}
            onClick={() => {
                if (Math.round(Math.random()) === 1) {
                    setNickname(pokemonName);
                    setOpenDialog(true);
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
                    <CatchButton pokemon={pokemonInfo}/>
                </div>
            </div>
            <div>
                {pokemonInfo?.types?.map((type) => (
                    <div key={type?.type?.name} css={[baseStyle, typeStyle]}>{type?.type?.name}</div>
                ))}
                <br/>
                {pokemonInfo?.moves?.map((move) => (
                    <div key={move?.move?.name} css={[baseStyle, moveStyle]}>{move?.move?.name}</div>
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
            <Dialog open={openDialog} onClose={() => { setOpenDialog(false) }} aria-labelledby="form-dialog-title">
                <form onSubmit={(e) => { e.preventDefault(); catchPokemon(pokemonInfo)}}>
                    <DialogTitle id="form-dialog-title">Pokemon Caught!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your pokemon's nickname.
                        </DialogContentText>
                        <TextField
                            error={isError}
                            autoFocus
                            margin="dense"
                            id="nickname"
                            label="Pokemon Nickname"
                            fullWidth
                            value={nickname}
                            helperText={helperText}
                            onChange={(e) => {validateInput(e.target.value)}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary" disabled={isError}>
                            Ok
                        </Button>
                        <Button onClick={() => { setNickname(pokemonName); setOpenDialog(false); }} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default PokemonDetails;
