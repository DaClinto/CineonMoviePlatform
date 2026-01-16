const API_KEY = '85b4cf051e341c4344d6c2f99f054e2a';
const BASE_URL = 'https://api.themoviedb.org/3';

const endpoints = {
    trending: `/trending/movie/week?api_key=${API_KEY}`,
    popular: `/movie/popular?api_key=${API_KEY}`,
    topRated: `/movie/top_rated?api_key=${API_KEY}`,
    upcoming: `/movie/upcoming?api_key=${API_KEY}`,
    genres: `/genre/movie/list?api_key=${API_KEY}`,
    series: `/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc`,
    originals: `/discover/tv?api_key=${API_KEY}&with_networks=213`, // Netflix Originals ID
    search: (query) => `/search/movie?api_key=${API_KEY}&query=${query}`,

    movieDetails: (id) => `/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`,
    byGenre: (genreId) => `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
};

export const fetchFromTMDB = async (endpointUrl) => {
    try {
        const response = await fetch(`${BASE_URL}${endpointUrl}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("TMDB API Error:", error);
        return null;
    }
};

export const getImageUrl = (path, size = 'original') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export { endpoints };
