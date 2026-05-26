WidgetMetadata = {
  id: "forward.india.content",
  title: "India Content Hub",
  description: "Trending in India, Hindi & Kannada movies, Indian TV",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Trending in India",
      description: "What's trending in India right now",
      functionName: "trendingIndia",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Popular Hindi Movies",
      description: "Top Hindi language movies",
      functionName: "hindiMovies",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Popular Kannada Movies",
      description: "Top Kannada language movies",
      functionName: "kannadaMovies",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Popular Indian TV Shows",
      description: "Trending TV from India",
      functionName: "indianTV",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Top Rated Indian Movies",
      description: "Highest rated Indian cinema",
      functionName: "topIndianMovies",
      cacheDuration: 7200,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "Bollywood Hits",
      description: "Popular Bollywood movies across genres",
      functionName: "bollywoodHits",
      cacheDuration: 3600,
      params: [
        { name: "page", title: "Page", type: "page" }
      ]
    }
  ]
};

function formatItem(item) {
  const mediaType = item.media_type || (item.title ? "movie" : "tv");
  return {
    id: item.id,
    type: "tmdb",
    title: item.title || item.name,
    description: item.overview,
    releaseDate: item.release_date || item.first_air_date,
    posterPath: item.poster_path,
    backdropPath: item.backdrop_path,
    rating: item.vote_average,
    mediaType: mediaType
  };
}

function filterValid(items) {
  return items.filter(i => i.poster_path && i.id && (i.title || i.name));
}

async function trendingIndia(params) {
  const page = params.page || 1;
  const [movies, tv] = await Promise.all([
    Widget.tmdb.get('/trending/movie/week', { params: { region: 'IN', page } }),
    Widget.tmdb.get('/trending/tv/week', { params: { region: 'IN', page } })
  ]);
  const all = [
    ...filterValid(movies.results).map(f => ({ ...formatItem(f), mediaType: 'movie' })),
    ...filterValid(tv.results).map(f => ({ ...formatItem(f), mediaType: 'tv' }))
  ];
  return all;
}

async function hindiMovies(params) {
  const page = params.page || 1;
  const data = await Widget.tmdb.get('/discover/movie', {
    params: {
      with_original_language: 'hi',
      sort_by: 'popularity.desc',
      page,
      'vote_count.gte': 10
    }
  });
  return filterValid(data.results).map(formatItem);
}

async function kannadaMovies(params) {
  const page = params.page || 1;
  const data = await Widget.tmdb.get('/discover/movie', {
    params: {
      with_original_language: 'kn',
      sort_by: 'popularity.desc',
      page,
      'vote_count.gte': 5
    }
  });
  return filterValid(data.results).map(formatItem);
}

async function indianTV(params) {
  const page = params.page || 1;
  const data = await Widget.tmdb.get('/discover/tv', {
    params: {
      with_origin_country: 'IN',
      sort_by: 'popularity.desc',
      page,
      'vote_count.gte': 5
    }
  });
  return filterValid(data.results).map(i => ({ ...formatItem(i), mediaType: 'tv' }));
}

async function topIndianMovies(params) {
  const page = params.page || 1;
  const data = await Widget.tmdb.get('/discover/movie', {
    params: {
      with_origin_country: 'IN',
      sort_by: 'vote_average.desc',
      page,
      'vote_count.gte': 50
    }
  });
  return filterValid(data.results).map(formatItem);
}

async function bollywoodHits(params) {
  const page = params.page || 1;
  const data = await Widget.tmdb.get('/discover/movie', {
    params: {
      with_original_language: 'hi',
      sort_by: 'vote_average.desc',
      page,
      'vote_count.gte': 100
    }
  });
  return filterValid(data.results).map(formatItem);
}
