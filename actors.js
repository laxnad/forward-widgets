WidgetMetadata = {
  id: "forward.actors",
  title: "Top Actors",
  description: "Movies starring top Hollywood & Indian actors",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Tom Cruise",
      functionName: "actorCruise",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Robert Downey Jr.",
      functionName: "actorDowney",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Leonardo DiCaprio",
      functionName: "actorDiCaprio",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Denzel Washington",
      functionName: "actorDenzel",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Tom Hanks",
      functionName: "actorHanks",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Brad Pitt",
      functionName: "actorPitt",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Christian Bale",
      functionName: "actorBale",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Harrison Ford",
      functionName: "actorFord",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Morgan Freeman",
      functionName: "actorFreeman",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Cillian Murphy",
      functionName: "actorMurphy",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Shah Rukh Khan",
      functionName: "actorSRK",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Aamir Khan",
      functionName: "actorAamir",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Salman Khan",
      functionName: "actorSalman",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Prabhas",
      functionName: "actorPrabhas",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Yash",
      functionName: "actorYash",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Allu Arjun",
      functionName: "actorAlluArjun",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Dwayne Johnson",
      functionName: "actorJohnson",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Keanu Reeves",
      functionName: "actorReeves",
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

async function fetchActorMovies(actorId) {
  try {
    const data = await Widget.tmdb.get(`/person/${actorId}/movie_credits`);
    const cast = data.cast || [];
    return filterValid(cast).sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0)).slice(0, 30).map(formatItem);
  } catch (e) {
    return [];
  }
}

async function actorCruise() { return fetchActorMovies(500); }
async function actorDowney() { return fetchActorMovies(3223); }
async function actorDiCaprio() { return fetchActorMovies(6193); }
async function actorDenzel() { return fetchActorMovies(5292); }
async function actorHanks() { return fetchActorMovies(31); }
async function actorPitt() { return fetchActorMovies(287); }
async function actorBale() { return fetchActorMovies(3894); }
async function actorFord() { return fetchActorMovies(3); }
async function actorFreeman() { return fetchActorMovies(192); }
async function actorMurphy() { return fetchActorMovies(2037); }
async function actorSRK() { return fetchActorMovies(11343); }
async function actorAamir() { return fetchActorMovies(30614); }
async function actorSalman() { return fetchActorMovies(11342); }
async function actorPrabhas() { return fetchActorMovies(47875); }
async function actorYash() { return fetchActorMovies(131128); }
async function actorAlluArjun() { return fetchActorMovies(11361); }
async function actorJohnson() { return fetchActorMovies(18918); }
async function actorReeves() { return fetchActorMovies(6384); }
