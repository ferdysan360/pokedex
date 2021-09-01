/** @jsxImportSource @emotion/react */
import './App.css';
import { css } from '@emotion/react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PokemonList from './Containers/PokemonList';
import PokemonDetails from './Containers/PokemonDetails';
import PokedexLogo from './Assets/pokedex_logo.png';
import MyPokemon from './Containers/MyPokemon';

function App() {

  const [page, setPage] = useState("pokemonList");
  const [pokemonName, setPokemonName] = useState(null);

  const section = css`
    margin: 20px 20px;
    max-width: 1280px;
  `

  const flex = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  `

  const pokedexLogoStyle = css`
    max-height: 50px;
  `

  const callback = (page, pokemonName) => {
    const newPage = page;
    const newPokemonName = pokemonName;
    setPokemonName(newPokemonName);
    setPage(newPage);
  }

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(0.5),
    },
  }));

  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <div css={section}>
          <img css={pokedexLogoStyle} src={PokedexLogo} alt="pokedex-logo" />
          <div>
            <Button size="small" variant="contained" color="primary" className={classes.margin} onClick={() => { setPage("pokemonList") }}>
              Pokemon List
            </Button>
            <Button size="small" variant="contained" color="primary" className={classes.margin} onClick={() => { setPage("myPokemon") }}>
              My Pokemon
            </Button>
          </div>
        </div>
      </header>
      <div css={flex}>
        <div css={section}>
          {
            page === "pokemonList" ? 
              <PokemonList pokemonListCallback={callback}/>
            : page === "myPokemon" ?
              <MyPokemon myPokemonCallback={callback}/>
            : page === "pokemonDetails" ?
              <PokemonDetails pokemonName={pokemonName}/>
            : <h1>Page Not Found</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
