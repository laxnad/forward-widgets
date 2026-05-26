WidgetMetadata = {
  id: "forward.directors",
  title: "Top Directors",
  description: "Movies by Nolan, Spielberg, Scorsese, Fincher, Satyajit Ray, SS Rajamouli & more",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Christopher Nolan",
      functionName: "dirNolan",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Steven Spielberg",
      functionName: "dirSpielberg",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Martin Scorsese",
      functionName: "dirScorsese",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "David Fincher",
      functionName: "dirFincher",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Quentin Tarantino",
      functionName: "dirTarantino",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Denis Villeneuve",
      functionName: "dirVilleneuve",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Stanley Kubrick",
      functionName: "dirKubrick",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Alfred Hitchcock",
      functionName: "dirHitchcock",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "James Cameron",
      functionName: "dirCameron",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Ridley Scott",
      functionName: "dirScott",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "SS Rajamouli",
      functionName: "dirRajamouli",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Satyajit Ray",
      functionName: "dirRay",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Mani Ratnam",
      functionName: "dirRatnam",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Anurag Kashyap",
      functionName: "dirKashyap",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Vishal Bhardwaj",
      functionName: "dirBhardwaj",
      cacheDuration: 21600,
      params: []
    }
  ]
};

function formatItem(item) {
  return {
    id: item.id,
    type: "tmdb",
    title: item.title,
    description: item.overview,
    releaseDate: item.release_date,
    posterPath: item.poster_path,
    backdropPath: item.backdrop_path,
    rating: item.vote_average,
    mediaType: "movie"
  };
}

function filterValid(items) {
  return items.filter(i => i.poster_path && i.id && i.title);
}

async function fetchDirectorMovies(directorId) {
  try {
    const data = await Widget.tmdb.get('/discover/movie', {
      params: { with_crew: directorId, sort_by: 'vote_count.desc', 'vote_count.gte': 20 }
    });
    return filterValid(data.results).map(formatItem);
  } catch (e) {
    return [];
  }
}

async function dirNolan() { return fetchDirectorMovies(525); }
async function dirSpielberg() { return fetchDirectorMovies(488); }
async function dirScorsese() { return fetchDirectorMovies(1032); }
async function dirFincher() { return fetchDirectorMovies(7467); }
async function dirTarantino() { return fetchDirectorMovies(138); }
async function dirVilleneuve() { return fetchDirectorMovies(137427); }
async function dirKubrick() { return fetchDirectorMovies(240); }
async function dirHitchcock() { return fetchDirectorMovies(2636); }
async function dirCameron() { return fetchDirectorMovies(2710); }
async function dirScott() { return fetchDirectorMovies(578); }
async function dirRajamouli() { return fetchDirectorMovies(115677); }
async function dirRay() { return fetchDirectorMovies(49942); }
async function dirRatnam() { return fetchDirectorMovies(124660); }
async function dirKashyap() { return fetchDirectorMovies(106595); }
async function dirBhardwaj() { return fetchDirectorMovies(122156); }
