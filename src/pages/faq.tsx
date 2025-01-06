import React from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import BreadCrumbs from '../components/breadcrumbs';

const Faq: React.FC = () => {
  const faqs = [
    {
      question: "What is YU Sync?",
      answer: "YU Sync is a course catalog, management, and review platform designed to help students explore and organize their academic paths effectively.",
    },
    {
      question: "How do I search for a course or prof?",
      answer: "Use the search bar at the top of the Courses page or through the searchbar in the Navbar. You can search by course code, department, or professor.",
    },
    {
      question: "Can I save courses for later?",
      answer: "Currently, saving courses for later is not available. However, this feature is planned for future updates.",
    },
    {
      question: "How frequently is the data updated?",
      answer: "The course data is not updated, the data is static and will not change over time, exceptions only for new programs. However, user reviews and ratings are updated in real-time.",
    },
    {
      question: "What if I can't find a course or professor?",
      answer: "If you can't find a course or professor, it is possible that the course is not available in the database. Please contact us at help@YUSync for further assistance.",
    },
  ];

  return (
    <>
      <NavBar />
      <BreadCrumbs />
      <div className="hero min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white border rounded-lg shadow-sm group"
              >
                <summary className="cursor-pointer flex items-center justify-between px-4 py-3 text-gray-800 group-open:text-red-600">
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-200 group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-4 py-2 text-gray-600 border-t">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
