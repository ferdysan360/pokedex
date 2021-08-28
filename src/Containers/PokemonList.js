import { jsx, css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonList() {

    const [count, setCount] = useState(0);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [pokemonList, setPokemonList] = useState(null);
    
    useEffect(() => {
        axios.get(url)
        .then(result => {
            setCount(result.data.count);
            setPrev(result.data.previous);
            setNext(result.data.next);
            setPokemonList(result.data.results);
        })
        .catch(error => {
            console.log(error);
        })
    }, [url]);

    return (
        <div>
            <div>Pokemon List</div>
            {pokemonList?.map((pokemon) => (
                <div>
                    <a 
                        href={pokemon.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        {pokemon.name}
                    </a>
                </div>
            ))}
            <button disabled={prev === null} onClick={() => { setUrl(prev) }}>Prev</button>
            <button disabled={next === null} onClick={() => { setUrl(next) }}>Next</button>
        </div>
        
    );
}

export default PokemonList;
