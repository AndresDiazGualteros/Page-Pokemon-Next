import { useState } from 'react';
import { pokeApi } from '@/api';
import Layout from '@/components/layouts/Layout';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Pokemon } from '../../interfaces';
import {getPokemonInfo, localFavorites} from '../../utils';

import conffeti from 'canvas-confetti';
import { PokemonListResponsive } from '../../interfaces/pokemon-list';
import { Sprites } from '../../interfaces/pokemon-full';



interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage : NextPage <Props> = ({ pokemon }) => {
  
    console.log({ pokemon });
    

  const [isInFavorites, setIsFavorites] = useState( localFavorites.existFavorites( pokemon.id ) );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id )
    setIsFavorites( !isInFavorites );

    if (isInFavorites) return;
    conffeti({
      zIndex:999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin:{
        x:1,
        y:0,
      }  
    })
  }


  

  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{ marginTop:'5px' }} gap={ 2 }>
          <Grid xs={ 12 } sm={ 4 }>
            <Card hoverable css={ {padding: '30px'}}>
              <Card.Body>
                <Card.Image 
                  src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                  alt={ pokemon.name }
                  width='100%'
                  height={ 200 }
                />
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={ 12 } sm={ 8 }>
            <Card>
              <Card.Header css={{display: 'flex', justifyContent: 'space-between' }}>
                <Text h1 transform='capitalize' > { pokemon.name } </Text>
                <Button
                color="gradient"
                ghost= { !isInFavorites }
                onClick={ onToggleFavorite }
                >
                { isInFavorites ? 'En favoritos' : 'Guardar en favoritos' }
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={ 30 }>Sprites:</Text>

                <Container direction='row' display='flex' gap={ 0 }>
                  <Image 
                  src={ pokemon.sprites.front_default }
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100 }
                  />
                  <Image 
                  src={ pokemon.sprites.back_default }
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100 }
                  />
                  <Image 
                  src={ pokemon.sprites.front_shiny }
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100 }
                  />
                  <Image 
                  src={ pokemon.sprites.back_shiny }
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100 }
                  />
                </Container>

              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponsive>('/pokemon?limit=151');

  const PokemonNames: string[] = data.results.map( Pokemon => Pokemon.name )
  

  return {
    paths: PokemonNames.map( name => ({
      params: { name }
    }) ),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ( { params }) => {
  
  const { name } = params as {name:string };

  return {
    props: {
      pokemon: await getPokemonInfo( name )

    }
  }
}




export default PokemonByNamePage ;
