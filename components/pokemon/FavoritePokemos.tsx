import { Grid, Card } from '@nextui-org/react'
import { FC } from 'react'
import React from 'react'
import FavoriteCardPokemon from './FavoriteCardPokemon';

interface Props {
    pokemons: number[];
}

const FavoritePokemos: FC <Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={ 2 } direction='row' justify='flex-start'>
    {
      pokemons.map( id => (
        <FavoriteCardPokemon key={ id } PokemonId={ id } />
      ) )
    }
  </Grid.Container>
  )
}

export default FavoritePokemos;