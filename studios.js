WidgetMetadata = {
  id: "forward.studios",
  title: "Film Studios",
  description: "Marvel Studios, DC, Pixar, Disney, Warner Bros, A24 & production houses",
  author: "Forward Widgets",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Marvel Studios",
      functionName: "studioMarvel",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "DC Studios",
      functionName: "studioDC",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Pixar",
      functionName: "studioPixar",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Walt Disney Animation",
      functionName: "studioDisneyAnim",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "DreamWorks Animation",
      functionName: "studioDreamworks",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Warner Bros",
      functionName: "studioWarner",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Universal Pictures",
      functionName: "studioUniversal",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "A24",
      functionName: "studioA24",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Lionsgate",
      functionName: "studioLionsgate",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Paramount Pictures",
      functionName: "studioParamount",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Sony Pictures",
      functionName: "studioSony",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Illumination",
      functionName: "studioIllumination",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Yash Raj Films",
      functionName: "studioYRF",
      cacheDuration: 21600,
      params: []
    },
    {
      title: "Dharma Productions",
      functionName: "studioDharma",
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
    mediaType: item.title ? "movie" : "tv"
  };
}

function filterValid(items) {
  return items.filter(i => i.poster_path && i.id && (i.title || i.name));
}

async function fetchStudioContent(companyId) {
  try {
    const data = await Widget.tmdb.get('/discover/movie', {
      params: { with_companies: companyId, sort_by: 'vote_count.desc', 'vote_count.gte': 20 }
    });
    return filterValid(data.results).map(formatItem);
  } catch (e) {
    return [];
  }
}

async function studioMarvel() { return fetchStudioContent(420); }
async function studioDC() { return fetchStudioContent(9993); }
async function studioPixar() { return fetchStudioContent(3); }
async function studioDisneyAnim() { return fetchStudioContent(6125); }
async function studioDreamworks() { return fetchStudioContent(521); }
async function studioWarner() { return fetchStudioContent(174); }
async function studioUniversal() { return fetchStudioContent(33); }
async function studioA24() { return fetchStudioContent(41077); }
async function studioLionsgate() { return fetchStudioContent(41); }
async function studioParamount() { return fetchStudioContent(4); }
async function studioSony() { return fetchStudioContent(34); }
async function studioIllumination() { return fetchStudioContent(6704); }
async function studioYRF() { return fetchStudioContent(29072); }
async function studioDharma() { return fetchStudioContent(2575); }
