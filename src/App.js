/** @jsxImportSource @emotion/react */
import './App.css';
import { jsx, css } from '@emotion/react'
import { useState } from 'react';
import PokemonList from './Containers/PokemonList';

function App() {

  const [page, setPage] = useState("pokemonList");

  const navMenuStyle = css`
    margin: 10px 0px;
  `

  return (
    <div className="App">
      <header className="App-header">
        <button css={navMenuStyle} onClick={() => { setPage("pokemonList") }}>Pokemon List</button>
        <button css={navMenuStyle} onClick={() => { setPage("myPokemon") }}>My Pokemon</button>
      </header>
      {
        page === "pokemonList" ? 
          <PokemonList />
        : page === "myPokemon" ?
          <div>My Pokemon</div>
        : <div>Pokemon Details</div>
      }
    </div>
  );
}

export default App;
