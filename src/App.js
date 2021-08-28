/** @jsxImportSource @emotion/react */
import './App.css';
import { jsx, css } from '@emotion/react'
import { useState } from 'react';
import PokemonList from './Containers/PokemonList';
import PokedexLogo from './Assets/pokedex_logo.png';

function App() {

  const [page, setPage] = useState("pokemonList");

  const navMenuStyle = css`
    margin: 10px 0px;
  `

  const section = css`
    margin: 20px 40px;
    max-width: 1440px;
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


  return (
    <div className="App">
      <header className="App-header">
        <div css={section}>
          <img css={pokedexLogoStyle} src={PokedexLogo} alt="pokedex-logo" />
          <div>
            <button css={navMenuStyle} onClick={() => { setPage("pokemonList") }}>Pokemon List</button>
            <button css={navMenuStyle} onClick={() => { setPage("myPokemon") }}>My Pokemon</button>
          </div>
        </div>
      </header>
      <div css={flex}>
        <div css={section}>
          {
            page === "pokemonList" ? 
            <PokemonList />
            : page === "myPokemon" ?
            <h1>My Pokemon</h1>
            : page === "pokemonDetails" ?
            <h1>Pokemon Details</h1>
            : <h1>Page Not Found</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
