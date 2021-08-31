/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PokemonCard from '../Components/PokemonCard';

const MyPokemon = ({ myPokemonCallback }) => {

    const [pokemonList, setPokemonList] = useState(null);
    const [openReleased, setOpenReleased] = useState(false);
    const [releasedMessage, setReleasedMessage] = useState(null);
    const [severity, setSeverity] = useState(null);

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

    const releasePokemon = ( pokemon, index ) => {
        if (window.confirm("Are you sure you want to release this pokemon?")) {
            var newPokemonList = pokemonList.slice();
            newPokemonList.splice(index, 1);

            window.localStorage.setItem("my_pokemon", JSON.stringify(newPokemonList));
            setPokemonList(newPokemonList);

            setReleasedMessage("Pokemon successfully released!");
            setSeverity("success");
            setOpenReleased(true);
        }
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
                        <PokemonCard pokemon={pokemon} detailsFunction={detailsPokemon} releaseFunction={releasePokemon} index={index} />
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
        </div>
    );
}

export default MyPokemon;
