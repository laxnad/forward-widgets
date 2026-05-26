WidgetMetadata = {
  id: "forward.genres",
  title: "Genre Explorer",
  description: "Browse movies & TV by genre — Action, Comedy, Drama, Horror, Sci-Fi & more",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Trending",
      description: "Trending across all genres",
      functionName: "trendingAll",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Action",
      functionName: "genreAction",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Comedy",
      functionName: "genreComedy",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Drama",
      functionName: "genreDrama",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Horror",
      functionName: "genreHorror",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Sci-Fi & Fantasy",
      functionName: "genreScifi",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Thriller",
      functionName: "genreThriller",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Romance",
      functionName: "genreRomance",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Animation",
      functionName: "genreAnimation",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Documentary",
      functionName: "genreDocumentary",
      cacheDuration: 7200,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Crime",
      functionName: "genreCrime",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Adventure",
      functionName: "genreAdventure",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Mystery",
      functionName: "genreMystery",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "War & History",
      functionName: "genreWar",
      cacheDuration: 7200,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Family & Kids",
      functionName: "genreFamily",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Music",
      functionName: "genreMusic",
      cacheDuration: 7200,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    }
  ]
};

function formatItem(item) {
  return {
    id: item.id,
    type: "tmdb",
    title: item.title || item.name,
    description: item.overview,
    releaseDate: item.release_date || item.first_air_date,
    posterPath: item.poster_path,
    backdropPath: item.backdrop_path,
    rating: item.vote_average,
    mediaType: item.title ? "movie" : "tv"
  };
}

function filterValid(items) {
  return items.filter(i => i.poster_path && i.id && (i.title || i.name));
}

async function discoverGenre(genreId, page, type) {
  const api = type === 'tv' ? '/discover/tv' : '/discover/movie';
  const data = await Widget.tmdb.get(api, {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      page: page || 1,
      'vote_count.gte': 20
    }
  });
  return filterValid(data.results).map(i => ({ ...formatItem(i), mediaType: type || (i.title ? 'movie' : 'tv') }));
}

async function trendingAll(params) {
  const page = params.page || 1;
  const [movies, tv] = await Promise.all([
    Widget.tmdb.get('/trending/movie/week', { params: { page } }),
    Widget.tmdb.get('/trending/tv/week', { params: { page } })
  ]);
  return [
    ...filterValid(movies.results).map(i => ({ ...formatItem(i), mediaType: 'movie' })),
    ...filterValid(tv.results).map(i => ({ ...formatItem(i), mediaType: 'tv' }))
  ];
}

async function genreAction(params) { return discoverGenre(28, params.page); }
async function genreComedy(params) { return discoverGenre(35, params.page); }
async function genreDrama(params) { return discoverGenre(18, params.page); }
async function genreHorror(params) { return discoverGenre(27, params.page); }
async function genreScifi(params) { return discoverGenre(878, params.page); }
async function genreThriller(params) { return discoverGenre(53, params.page); }
async function genreRomance(params) { return discoverGenre(10749, params.page); }
async function genreAnimation(params) { return discoverGenre(16, params.page); }
async function genreDocumentary(params) { return discoverGenre(99, params.page); }
async function genreCrime(params) { return discoverGenre(80, params.page); }
async function genreAdventure(params) { return discoverGenre(12, params.page); }
async function genreMystery(params) { return discoverGenre(9648, params.page); }
async function genreWar(params) { return discoverGenre(10752, params.page); }
async function genreFamily(params) { return discoverGenre(10751, params.page); }
async function genreMusic(params) { return discoverGenre(10402, params.page); }
