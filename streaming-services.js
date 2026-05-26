WidgetMetadata = {
  id: "forward.streaming.services",
  title: "Streaming Services",
  description: "Browse content from Netflix, Prime Video, Disney+, Hotstar, HBO, Apple TV+, Hulu, Paramount+ & more",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Netflix",
      description: "Popular content on Netflix",
      functionName: "netflix",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Prime Video",
      description: "Popular content on Amazon Prime Video",
      functionName: "primeVideo",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Disney+ Hotstar",
      description: "Popular content on Disney+",
      functionName: "disneyPlus",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "HBO Max",
      description: "Popular content on HBO & Max",
      functionName: "hbo",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Apple TV+",
      description: "Popular content on Apple TV+",
      functionName: "appleTV",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Hulu",
      description: "Popular content on Hulu",
      functionName: "hulu",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Paramount+",
      description: "Popular content on Paramount+",
      functionName: "paramount",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "JioHotstar (Disney+ India)",
      description: "Content popular on Disney+ Hotstar India",
      functionName: "hotstarIndia",
      cacheDuration: 3600,
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

async function fetchNetworkContent(networkId, page) {
  const [movies, tv] = await Promise.all([
    Widget.tmdb.get('/discover/movie', {
      params: { with_networks: networkId, sort_by: 'popularity.desc', page: page || 1, 'vote_count.gte': 10 }
    }),
    Widget.tmdb.get('/discover/tv', {
      params: { with_networks: networkId, sort_by: 'popularity.desc', page: page || 1, 'vote_count.gte': 10 }
    })
  ]);
  const all = [
    ...filterValid(movies.results).map(i => ({ ...formatItem(i), mediaType: 'movie' })),
    ...filterValid(tv.results).map(i => ({ ...formatItem(i), mediaType: 'tv' }))
  ];
  return all;
}

async function netflix(params) { return fetchNetworkContent(213, params.page); }
async function primeVideo(params) { return fetchNetworkContent(1024, params.page); }
async function disneyPlus(params) { return fetchNetworkContent(2739, params.page); }
async function hbo(params) { return fetchNetworkContent(49, params.page); }
async function appleTV(params) { return fetchNetworkContent(2552, params.page); }
async function hulu(params) { return fetchNetworkContent(453, params.page); }
async function paramount(params) { return fetchNetworkContent(4330, params.page); }

async function hotstarIndia(params) {
  const page = params.page || 1;
  const [movies, tv] = await Promise.all([
    Widget.tmdb.get('/discover/movie', {
      params: { with_networks: 2739, with_origin_country: 'IN', sort_by: 'popularity.desc', page, 'vote_count.gte': 5 }
    }),
    Widget.tmdb.get('/discover/tv', {
      params: { with_networks: 2739, with_origin_country: 'IN', sort_by: 'popularity.desc', page, 'vote_count.gte': 5 }
    })
  ]);
  const all = [
    ...filterValid(movies.results).map(i => ({ ...formatItem(i), mediaType: 'movie' })),
    ...filterValid(tv.results).map(i => ({ ...formatItem(i), mediaType: 'tv' }))
  ];
  return all;
}
