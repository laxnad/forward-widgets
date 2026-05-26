WidgetMetadata = {
  id: "forward.franchises",
  title: "Franchise Collections",
  description: "Marvel, Star Wars, Harry Potter, James Bond, LOTR & more cinematic universes",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Marvel Cinematic Universe",
      description: "All MCU films in order",
      functionName: "collectionMarvel",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Star Wars Saga",
      functionName: "collectionStarWars",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Harry Potter",
      functionName: "collectionHarryPotter",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "The Lord of the Rings",
      functionName: "collectionLOTR",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "James Bond 007",
      functionName: "collectionBond",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Jurassic Park",
      functionName: "collectionJurassic",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Indiana Jones",
      functionName: "collectionIndiana",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Fast & Furious",
      functionName: "collectionFast",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "John Wick",
      functionName: "collectionWick",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Mission: Impossible",
      functionName: "collectionMission",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "The Matrix",
      functionName: "collectionMatrix",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Star Trek",
      functionName: "collectionStarTrek",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Avatar",
      functionName: "collectionAvatar",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Pirates of the Caribbean",
      functionName: "collectionPirates",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "The Hunger Games",
      functionName: "collectionHunger",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Back to the Future",
      functionName: "collectionBackFuture",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Transformers",
      functionName: "collectionTransformers",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "DC Extended Universe",
      functionName: "collectionDCEU",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Rocky & Creed",
      functionName: "collectionRocky",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Monsterverse",
      functionName: "collectionMonsterverse",
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

async function fetchCollection(collectionId) {
  try {
    const data = await Widget.tmdb.get(`/collection/${collectionId}`);
    const parts = data.parts || [];
    return filterValid(parts).sort((a, b) => (a.release_date || '').localeCompare(b.release_date || '')).map(formatItem);
  } catch (e) {
    return [];
  }
}

async function fetchDiscoverWithKeywords(keywordId, title) {
  const data = await Widget.tmdb.get('/discover/movie', {
    params: { with_keywords: keywordId, sort_by: 'release_date.asc', 'vote_count.gte': 5 }
  });
  return filterValid(data.results).map(formatItem);
}

async function collectionMarvel() { return fetchCollection(86311); }
async function collectionStarWars() { return fetchCollection(10); }
async function collectionHarryPotter() { return fetchCollection(1241); }
async function collectionLOTR() { return fetchCollection(119); }
async function collectionBond() { return fetchCollection(645); }
async function collectionJurassic() { return fetchCollection(328); }
async function collectionIndiana() { return fetchCollection(850); }
async function collectionFast() { return fetchCollection(9485); }
async function collectionWick() { return fetchCollection(131292); }
async function collectionMission() { return fetchCollection(170493); }
async function collectionMatrix() { return fetchCollection(164071); }
async function collectionStarTrek() { return fetchCollection(520); }
async function collectionAvatar() { return fetchCollection(153216); }
async function collectionPirates() { return fetchCollection(170469); }
async function collectionHunger() { return fetchCollection(172771); }
async function collectionBackFuture() { return fetchCollection(264159); }
async function collectionTransformers() { return fetchCollection(157422); }
async function collectionRocky() { return fetchCollection(4085); }
async function collectionMonsterverse() { return fetchCollection(173710); }

async function collectionDCEU() {
  const data = await Widget.tmdb.get('/discover/movie', {
    params: { with_keywords: 293994, sort_by: 'release_date.asc', 'vote_count.gte': 10 }
  });
  const results = data.results || [];
  return filterValid(results).map(formatItem);
}
