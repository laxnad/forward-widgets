WidgetMetadata = {
  id: "forward.decades",
  title: "Decades",
  description: "Popular movies from the 1980s through 2020s",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "1980s Movies",
      description: "Top films from the 80s",
      functionName: "decade80s",
      cacheDuration: 21600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "1990s Movies",
      description: "Top films from the 90s",
      functionName: "decade90s",
      cacheDuration: 21600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "2000s Movies",
      description: "Top films from the 2000s",
      functionName: "decade2000s",
      cacheDuration: 21600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "2010s Movies",
      description: "Top films from the 2010s",
      functionName: "decade2010s",
      cacheDuration: 21600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "2020s Movies",
      description: "Top films so far this decade",
      functionName: "decade2020s",
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

async function decadeMovies(start, end, page) {
  const data = await Widget.tmdb.get('/discover/movie', {
    params: {
      'primary_release_date.gte': `${start}-01-01`,
      'primary_release_date.lte': `${end}-12-31`,
      sort_by: 'vote_count.desc',
      page: page || 1,
      'vote_count.gte': 200
    }
  });
  return filterValid(data.results).map(formatItem);
}

async function decade80s(params) { return decadeMovies(1980, 1989, params.page); }
async function decade90s(params) { return decadeMovies(1990, 1999, params.page); }
async function decade2000s(params) { return decadeMovies(2000, 2009, params.page); }
async function decade2010s(params) { return decadeMovies(2010, 2019, params.page); }
async function decade2020s(params) { return decadeMovies(2020, 2029, params.page); }
