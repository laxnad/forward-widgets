"use strict";

WidgetMetadata = {
    name: "Custom Movie Collections",
    version: 1,
    modules: [
        { id: "popular", title: "Popular Movies", functionName: "fetchPopular", cacheDuration: 3600, params: [] },
        { id: "criterion", title: "Criterion Collection", functionName: "fetchCriterion", cacheDuration: 7200, params: [] },
        { id: "mubi", title: "MUBI", functionName: "fetchMUBI", cacheDuration: 7200, params: [] },
        { id: "a24", title: "A24", functionName: "fetchA24", cacheDuration: 7200, params: [] },
        { id: "ghibli", title: "Studio Ghibli", functionName: "fetchGhibli", cacheDuration: 7200, params: [] },
        { id: "lynch", title: "David Lynch", functionName: "fetchLynch", cacheDuration: 7200, params: [] },
        { id: "wong", title: "Wong Kar-wai", functionName: "fetchWongKarWai", cacheDuration: 7200, params: [] }
    ]
};

var TMDB_KEY = "f884987255f3fffb672b7be1cb71c313";
var TMDB_BASE = "https://api.themoviedb.org/3";

async function tmdb(path, params) {
    try {
        var p = { api_key: TMDB_KEY };
        if (params) {
            for (var k in params) p[k] = params[k];
        }
        var res = await Widget.http.get(TMDB_BASE + path, { params: p });
        return res.json;
    } catch (e) {
        console.error("tmdb error:", path, e && e.message);
        return null;
    }
}

function toItem(m) {
    return {
        id: m.id,
        type: "tmdb",
        title: m.title || m.name || m.original_title || "",
        description: m.overview || "",
        posterPath: m.poster_path,
        backdropPath: m.backdrop_path,
        rating: m.vote_average || 0,
        mediaType: "movie"
    };
}

function byYear(a, b) {
    var ya = a.release_date ? parseInt(a.release_date.split("-")[0]) : 0;
    var yb = b.release_date ? parseInt(b.release_date.split("-")[0]) : 0;
    return yb - ya;
}

async function fetchPopular(params) {
    "use strict";
    var d = await tmdb("/trending/movie/week");
    if (!d || !d.results) return [];
    return d.results.map(toItem);
}

async function fetchCriterion(params) {
    "use strict";
    var d = await tmdb("/collection/86311");
    if (!d || !d.parts) return [];
    return d.parts.map(toItem);
}

async function fetchMUBI(params) {
    "use strict";
    var kw = await tmdb("/search/keyword", { query: "mubi" });
    if (kw && kw.results && kw.results.length) {
        for (var i = 0; i < kw.results.length; i++) {
            if (kw.results[i].name.toLowerCase() === "mubi") {
                var d = await tmdb("/discover/movie", {
                    with_keywords: kw.results[i].id,
                    sort_by: "vote_average.desc",
                    "vote_count.gte": 50
                });
                if (d && d.results) return d.results.map(toItem);
            }
        }
    }
    var fb = await tmdb("/discover/movie", {
        sort_by: "vote_average.desc",
        "vote_count.gte": 200,
        "vote_average.gte": 7
    });
    if (fb && fb.results) return fb.results.map(toItem);
    return [];
}

async function fetchA24(params) {
    "use strict";
    var d = await tmdb("/discover/movie", {
        with_companies: 41096,
        sort_by: "vote_average.desc",
        "vote_count.gte": 50
    });
    if (!d || !d.results) return [];
    return d.results.map(toItem);
}

async function fetchGhibli(params) {
    "use strict";
    var d = await tmdb("/collection/124709");
    if (!d || !d.parts) return [];
    return d.parts.map(toItem);
}

async function fetchLynch(params) {
    "use strict";
    var d = await tmdb("/person/5602/movie_credits");
    if (!d || !d.crew) return [];
    return d.crew.filter(function(m) { return m.job === "Director"; }).sort(byYear).map(toItem);
}

async function fetchWongKarWai(params) {
    "use strict";
    var d = await tmdb("/person/13923/movie_credits");
    if (!d || !d.crew) return [];
    return d.crew.filter(function(m) { return m.job === "Director"; }).sort(byYear).map(toItem);
}
