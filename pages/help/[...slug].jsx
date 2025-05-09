import { useRouter } from 'next/router';

const helpContent = {
  '': {
    title: 'Help Center',
    body: 'Welcome to the help center. Choose a topic below.',
  },
  faqs: {
    title: 'FAQs',
    body: 'Here are answers to frequently asked questions.',
  },
  contact: {
    title: 'Contact Us',
    body: 'You can contact us at support@example.com.',
  },
  privacy: {
    title: 'Privacy Policy',
    body: 'We respect your privacy. Here’s how we handle your data.',
  },
};

export default function HelpPage() {
  const router = useRouter();
  const { slug = [] } = router.query;

  const key = slug.join('/') || '';

  const content = helpContent[key];

  if (!content) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Page Not Found</h1>
        <p className="text-gray-600">Sorry, this help page doesn’t exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{content.title}</h1>
      <p className="text-gray-700">{content.body}</p>
    </div>
  );
}
