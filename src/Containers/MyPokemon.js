/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PokemonCard from '../Components/PokemonCard';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const MyPokemon = ({ myPokemonCallback }) => {

    const [pokemonList, setPokemonList] = useState(null);
    const [openReleased, setOpenReleased] = useState(false);
    const [releasedMessage, setReleasedMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [pokemonIndex, setPokemonIndex] = useState(-1);

    useEffect(() => {
        setPokemonList(JSON.parse(window.localStorage.getItem("my_pokemon")));
    }, []);

    const callback = (pokemonName) => {
        myPokemonCallback("pokemonDetails", pokemonName);
    }

    const flexPokemonList = css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin: 0px 0px 20px 0px;
    `

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const detailsPokemon = (pokemonName) => {
        callback(pokemonName);
    }

    const confirmRelease = () => {
        var newPokemonList = pokemonList.slice();
        newPokemonList.splice(pokemonIndex, 1);

        window.localStorage.setItem("my_pokemon", JSON.stringify(newPokemonList));
        setPokemonList(newPokemonList);

        setOpenDialog(false);
        setReleasedMessage("Pokemon successfully released!");
        setSeverity("success");
        setOpenReleased(true);
    }

    const releasePokemon = ( pokemon, index ) => {
        setPokemonIndex(index);
        setOpenDialog(true);
    }

    return (
        <div>
            <h1>My Pokemon</h1>
            {
                (pokemonList === null || pokemonList?.length === 0) ?
                    <div>No Pokemon have been caught. Go catch some!</div>
                :
                <div css={flexPokemonList}>
                    {pokemonList?.map((pokemon, index) => (
                        <PokemonCard key={pokemon.nickname} pokemon={pokemon} detailsFunction={detailsPokemon} releaseFunction={releasePokemon} index={index} />
                    ))}
                </div>
            }
            <Snackbar
                open={openReleased}
                onClose={() => setOpenReleased(false)}
                autoHideDuration={4000}
            >
                <Alert onClose={() => setOpenReleased(false)} severity={severity}>
                    {releasedMessage}
                </Alert>
            </Snackbar>
            <Dialog open={openDialog} onClose={() => { setOpenDialog(false) }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Release Pokemon</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to release this pokemon?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { confirmRelease(); }} color="secondary">
                        Yes
                    </Button>
                    <Button onClick={() => { setPokemonIndex(-1); setOpenDialog(false); }} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MyPokemon;
