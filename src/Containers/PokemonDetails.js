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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { indigo, amber } from '@material-ui/core/colors';

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
        background-color: #E0E0E0;
    `

    const moveStyle = css`
        background-color: #424242;
        color: white;
    `

    const flex = css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    `

    const imgStyle = css`
        width: 200px;
        height: 200px;
    `

    const imgContainerStyle = css`
        padding: 20px 0px;
        min-width: 250px;
        border-radius: 8px;
        box-shadow: 5px 5px 18px #888888;
    `

    const nameStyle = css`
        border: unset;
        padding: 10px 0px 30px 0px;
    `

    const typesMovesContainersStyle = css`
        border-radius: 8px;
        box-shadow: 5px 5px 18px #888888;
        padding: 20px 20px;
    `

    const subTitleStyle = css`
        font-size: 18px;
        font-weight: 900;
        display: flex;
        justify-content: start;
        margin: 0px 0px 5px 0px;
    `

    const typesStyle = css`
        display: flex;
        flex-wrap: wrap;
        margin: 0px 0px 30px 0px;
    `

    const movesStyle = css`
        display: flex;
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

    const YellowButton = withStyles((theme) => ({
        root: {
            color: indigo[800],
            backgroundColor: amber[500],
            fontWeight: 700,
            fontSize: '20px',
            '&:hover': {
                backgroundColor: amber[700],
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
        <div>
            <h1>Pokemon Details</h1>
            <div css={flex}>
                <div css={imgContainerStyle}>
                    <img css={imgStyle} src={pokemonInfo?.sprites?.other["official-artwork"]?.front_default} alt="pokemon"/>
                </div>
                <div css={nameStyle}>
                    <h2>{pokemonInfo?.name}</h2>
                    <YellowButton 
                        size="large" 
                        variant="contained" 
                        color="primary" 
                        className={classes.margin} 
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
                    </YellowButton>
                </div>
                <div css={typesMovesContainersStyle}>
                    <div css={subTitleStyle}>
                        Types
                    </div>
                    <div css={typesStyle}>
                        {pokemonInfo?.types?.map((type) => (
                            <div key={type?.type?.name} css={[baseStyle, typeStyle]}>{type?.type?.name}</div>
                        ))}
                    </div>
                    <div css={subTitleStyle}>
                        Moves
                    </div>
                    <div css={movesStyle}>
                        {pokemonInfo?.moves?.map((move) => (
                            <div key={move?.move?.name} css={[baseStyle, moveStyle]}>{move?.move?.name}</div>
                        ))}
                    </div>
                </div>
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
