import React from 'react';
import { mount, shallow } from 'enzyme';

import App from './App';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieList from './components/MovieList';
import Rating from './components/Rating';

let wrapper;

const movies = [
  {
    title: 'Movie Title 1',
    subtitle: 'Movie Subtitle 1',
    storyline: 'Movie Storyline 1',
    rating: 4.5,
    imagePath: 'images/movie_1',
  },
  {
    title: 'Movie Title 2',
    subtitle: 'Movie Subtitle 2',
    storyline: 'Movie Storyline 2',
    rating: 4.5,
    imagePath: 'images/movie_2',
  },
  {
    title: 'Movie Title 3',
    subtitle: 'Movie Subtitle 3',
    storyline: 'Movie Storyline 3',
    rating: 3,
    imagePath: 'images/movie_3',
  },
];

describe('Implementar o componente <Header />', () => {
  it('Renderizar o componente sem quebrar a aplicação', () => {
    shallow(<Header />);
  });

  it('Encontrar o texto `Movie Cards Library` dentro de uma tag <h1></h1>', () => {
    wrapper = shallow(<Header />);

    expect(wrapper.find('header h1').text()).toBe('Movie Cards Library');
  });
});

describe('Implementar o componente <MovieList />', () => {
  it('Renderizar sem quebrar a aplicação', () => {
    shallow(<MovieList movies={movies} />);
  });

  it('Mostrar um componente <MovieCard /> para cada objeto no array', () => {
    wrapper = shallow(<MovieList movies={movies} />);

    expect(wrapper.find(MovieCard).length).toEqual(3);
  });

  it('Usar o título (title) do filme como `key` em cada <MovieCard /> mostrado', () => {
    wrapper = mount(<MovieList movies={movies} />);
    const movieCards = wrapper.find(MovieCard);

    movieCards.forEach((movieCard, index) => {
      expect(movieCard.key()).toEqual(movies[index].title);
    });
  });
});

describe('Implementar o componente <MovieCard />', () => {
  const movie = movies[0];

  it('Renderizar o componente sem quebrar a aplicação', () => {
    shallow(<MovieCard movie={movie} />);
  });

  it('Mostrar a imagem do filme dentro da tag <img />', () => {
    wrapper = shallow(<MovieCard movie={movie} />);

    expect(wrapper.find('img').prop('src')).toEqual('images/movie_1');
  });

  it('Mostrar o título (title) do filme dentro de uma tag <h4></h4>', () => {
    wrapper = shallow(<MovieCard movie={movie} />);

    expect(wrapper.find('h4').text()).toBe('Movie Title 1');
  });

  it('Mostrar o subtítulo (subtitle) do filme dentro de uma tag <h5></h5>', () => {
    wrapper = shallow(<MovieCard movie={movie} />);

    expect(wrapper.find('h5').text()).toBe('Movie Subtitle 1');
  });


  it('Mostrar a sinópse (storyline) do filme dentro de uma tag <p></p>', () => {
    wrapper = shallow(<MovieCard movie={movie} />);

    expect(wrapper.find('p').text()).toBe('Movie Storyline 1');
  });

  it('Mostrar um componente <Rating />', () => {
    wrapper = shallow(<MovieCard movie={movie} />);

    expect(wrapper.find('Rating').length).toEqual(1);
  });

  it('Passar o atributo (prop) `rating` para o componente <Rating />', () => {
    wrapper = mount(<MovieCard movie={movie} />);
    const starRating = wrapper.find(Rating);

    expect(starRating.props().rating).toEqual(4.5);
  });
});

describe('Implementar o componente <Rating />', () => {
  it('Renderizar sem quebrar a aplicação', () => {
    shallow(<Rating />);
  });

  it('Mostrar a pontuação (rating) dentro de um elemento com a classe `rating`', () => {
    wrapper = shallow(<Rating rating={3} />);

    expect(wrapper.find('.rating').text()).toEqual('3');
  });
});

describe('Implementar o componente <App />', () => {
  it('Mostrar o componente <Header />', () => {
    wrapper = shallow(<App />);

    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('Mostrar o componente <MovieList />', () => {
    expect(wrapper.find('MovieList').length).toEqual(1);
  });
});
