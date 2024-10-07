import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className="text-indigo-600 hover:text-indigo-500">
        Go back to homepage
      </Link>
    </div>
  );
}