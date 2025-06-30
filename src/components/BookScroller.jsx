import React, { useRef, useState, useCallback, useEffect } from 'react';

const books = [
  { title: 'Book 1', imgSrc: '/book1.png' },
  { title: 'Book 2', imgSrc: '/book2.png' },
  { title: 'Book 3', imgSrc: '/book3.png' },
  { title: 'Book 4', imgSrc: '/book4.png' },
  { title: 'Book 5', imgSrc: '/book5.png' },
  { title: 'Book 6', imgSrc: '/book6.png' },
  { title: 'Book 7', imgSrc: '/book7.png' },
];

const BookScroller = () => {
  const scrollContainerRef = useRef(null);
  const [activeBook, setActiveBook] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollLeft = scrollContainer.scrollLeft;
      const bookElements = Array.from(scrollContainer.children);
      let closestIndex = 0;
      let minDistance = Infinity;
      bookElements.forEach((book, index) => {
        const distance = Math.abs(book.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      setActiveBook(closestIndex);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollTimeout;
    const debouncedScrollHandler = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', debouncedScrollHandler);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', debouncedScrollHandler);
      }
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  return (
    <div className="relative w-full overflow-hidden mt-8 mb-16">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 -mx-2"
      >
        {books.map((book, index) => (
          <div key={index} className="flex-shrink-0 snap-start px-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
            <img src={book.imgSrc} alt={book.title} className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer" />
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      <div className="flex justify-center space-x-3 mt-[-2rem] mb-8">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const scrollContainer = scrollContainerRef.current;
              const bookElement = scrollContainer.children[index];
              if (scrollContainer && bookElement) {
                scrollContainer.scrollTo({
                  left: bookElement.offsetLeft,
                  behavior: 'smooth',
                });
              }
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeBook === index ? 'bg-red-400 scale-125' : 'bg-gray-300'}`}
            aria-label={`Go to book ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BookScroller;
