/**
 * Embed provider configurations.
 * Each provider exposes a `movie(tmdbId)` and `tv(tmdbId, season, episode)` builder.
 */
export const EMBED_PROVIDERS = [
    {
        id: 'vidsrc_me',
        label: 'VidSrc',
        movie: (tmdbId) => `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`,
        tv: (tmdbId, season, episode) =>
            `https://vidsrc.me/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`,
    },
    {
        id: 'vidsrc_xyz',
        label: 'VidSrc XYZ',
        movie: (tmdbId) => `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}`,
        tv: (tmdbId, season, episode) =>
            `https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`,
    },
    {
        id: 'embed_su',
        label: 'Embed.su',
        movie: (tmdbId) => `https://embed.su/embed/movie/${tmdbId}`,
        tv: (tmdbId, season, episode) =>
            `https://embed.su/embed/tv/${tmdbId}/${season}/${episode}`,
    },
    {
        id: '2embed',
        label: '2Embed',
        movie: (tmdbId) => `https://www.2embed.cc/embed/${tmdbId}`,
        tv: (tmdbId, season, episode) =>
            `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`,
    },
    {
        id: 'autoembed',
        label: 'AutoEmbed',
        movie: (tmdbId) => `https://player.autoembed.cc/embed/movie/${tmdbId}`,
        tv: (tmdbId, season, episode) =>
            `https://player.autoembed.cc/embed/tv/${tmdbId}/${season}/${episode}`,
    },
    {
        id: 'multiembed',
        label: 'MultiEmbed',
        movie: (tmdbId) => `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`,
        tv: (tmdbId, season, episode) =>
            `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`,
    },
];

export const DEFAULT_PROVIDER_ID = 'vidsrc_me';

export const getProvider = (id) =>
    EMBED_PROVIDERS.find((p) => p.id === id) ||
    EMBED_PROVIDERS.find((p) => p.id === DEFAULT_PROVIDER_ID);
