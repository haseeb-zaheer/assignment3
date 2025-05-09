import Link from 'next/link';
import { useRouter } from 'next/router';

// as we didnt use 'use-client', Next automatically statically
// generates the page

export default function MovieDetailsPage({ movie, director, genre }) {
  const router = useRouter();

  // fallback handling if page is not generated yet
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{movie.title}</h1>

      <p className="text-gray-600 mb-2"><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p className="text-gray-600 mb-2"><strong>Rating:</strong> ⭐ {movie.rating}</p>
      <p className="text-gray-600 mb-2">
        <strong>Genre:</strong> {genre?.name || 'Unknown'}
      </p>
      <p className="text-gray-600 mb-4">
        <Link href={`/movies/${movie.id}/director`} className="text-blue-600 hover:underline">
          {director?.name || 'Unknown'}
        </Link>
      </p>

      <p className="text-gray-800">{movie.description}</p>
    </div>
  );
}

// This page will be statically generated per movie using getStaticPaths
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/moviesData');
  const data = await res.json();

  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: true, // enable fallback loading for ISR
  };
}

// implemented ISR using getStaticProps and revalidate
export async function getStaticProps({ params }) {
  const res = await fetch('http://localhost:3000/api/moviesData');

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  const movie = data.movies.find((m) => m.id === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);
  const genre = data.genres.find((g) => g.id === movie.genreId);

  return {
    props: {
      movie,
      director: director || null,
      genre: genre || null,
    },
    revalidate: 60, // ISR every 60 seconds
  };
}
