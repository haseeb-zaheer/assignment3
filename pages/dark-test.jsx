export default function DarkTest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Dark Mode Test</h1>
        <div className="bg-testPink text-white p-4">If you see pink, config is working.</div>

        <p>If this background turns black and text turns white, it's working.</p>
      </div>
    </div>
  );
}
