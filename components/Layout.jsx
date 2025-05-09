import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        {children}
      </main>
    </>
  );
}
