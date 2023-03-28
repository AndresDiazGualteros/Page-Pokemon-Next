import { NextPage, GetStaticProps } from 'next';
import { Grid, Image } from '@nextui-org/react';
import Layout from '@/components/layouts/Layout';
import pokeApi from '../api/pokeApi';
import { PokemonListResponsive } from '../interfaces';
import { SmallPokemon } from '../interfaces/pokemon-list';
import Pokemoncard from '@/components/pokemon/Pokemoncard';

interface Props {
  pokemons: SmallPokemon[];
}


const HomePage: NextPage <Props> = ({ pokemons }) => {

  console.log(pokemons);
  
  return (
    <Layout title='Listado de pokemons'>

      
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map(( pokemon ) => (
            <Pokemoncard
            key={ pokemon.id }
            pokemon={ pokemon }
            />
          ))
        }
      </Grid.Container>
    </Layout>
  );
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const {data} = await pokeApi.get <PokemonListResponsive> ('/pokemon?limit=151');  
  
  
  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }) )

  //

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;
