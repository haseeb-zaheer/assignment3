import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  useEffect(() => {
    if (!trendingMovies || trendingMovies.length === 0) {
      router.replace('/404');
    }
  }, [trendingMovies, router]);

  if (!trendingMovies || trendingMovies.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
        Trending Movies
      </h1>

      <ul className="space-y-6 mb-10">
        {trendingMovies.map((movie) => (
          <li
            key={movie.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
              <span className="font-medium">Year:</span> {movie.releaseYear} | 
              <span className="font-medium ml-2">Rating:</span> {movie.rating}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{movie.description}</p>
          </li>
        ))}
      </ul>

      <div className="text-center space-x-4">
      <a
        href="/genres"
        className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
      >
        Go to Genres Page
      </a>
      <a
        href="/movies"
        className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-md transition-colors"
      >
        Go to Movies Page
      </a>
      </div>

    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/movies'); // ✅ correct route now

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const movies = await res.json();
  const trendingMovies = movies.filter((movie) => movie.rating >= 8.5);

  if (!trendingMovies || trendingMovies.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      trendingMovies,
    },
    revalidate: 60,
  };
}

