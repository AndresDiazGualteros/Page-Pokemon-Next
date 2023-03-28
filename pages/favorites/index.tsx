import Layout from '@/components/layouts/Layout';
import NoFavorites from '@/components/ui/NoFavorites';
import React from 'react'
import { useState, useEffect } from 'react';
import { localFavorites } from '@/utils';
import FavoritePokemos from '@/components/pokemon/FavoritePokemos';

const FavoritesPage = () => {

  const [favoritesPokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons() );
  }, [])
  


  return (
    <Layout title='pokemons-favoritos'>
      {
      favoritesPokemons.length === 0 ? (<NoFavorites />) 
      : (<FavoritePokemos  pokemons={ favoritesPokemons }/>)
      }
      
    </Layout>
  )
}


export default FavoritesPage;