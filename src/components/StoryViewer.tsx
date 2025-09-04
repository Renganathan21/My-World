import React, { useRef, useState, useCallback } from 'react';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';

interface PageJSON {
  id: string;
  title?: string;
  content: string[];
}

interface StoryJSON {
  id: string;
  title: string;
  pages: PageJSON[];
}

interface StoryViewerProps {
  story: StoryJSON;
  onBack: () => void;
}

const PageCover = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content flex items-center justify-center h-full">
        <h2 className="text-center text-3xl font-bold">{children}</h2>
      </div>
    </div>
  )
);

const Page = React.forwardRef<
  HTMLDivElement,
  { number: number; title?: string; content: string[] }
>(({ number, title, content }, ref) => (
  <div className="page" ref={ref}>
    <div className="page-content p-6 flex flex-col h-full justify-between">
      {title && (
        <h3 className="page-header text-xl font-semibold text-center mb-4">{title}</h3>
      )}
      <div className="page-text flex-1 overflow-auto">
        {content.map((text, idx) => (
          <p key={idx} className="mb-2 leading-relaxed">
            {text}
          </p>
        ))}
      </div>
      <div className="page-footer text-sm text-right mt-2">{number + 1}</div>
    </div>
  </div>
));

export const StoryViewer: React.FC<StoryViewerProps> = ({ story, onBack }) => {
  const flipBook = useRef<HTMLFlipBook>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = useCallback(() => {
    flipBook.current?.flipNext();
  }, []);

  const handlePrevPage = useCallback(() => {
    flipBook.current?.flipPrev();
  }, []);

  const handleInit = useCallback(() => {
    // flipBook.current is guaranteed to be initialized here
    setTotalPages(flipBook.current?.getPageCount() ?? 0);
  }, []);

  return (
    <div className=" bg-[var(--theme-bg-primary)] relative overflow-hidden">
      <button
        className="absolute top-4 left-4 z-10 bg-gray-700 text-white px-4 py-2 rounded"
        onClick={onBack}
      >
        Back
      </button>

      <div className="flex justify-center mt-8">
        <HTMLFlipBook
          width={400}
          height={340}
          minWidth={400}
          minHeight={600}
          size="stretch"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={(e: any) => setCurrentPage(e.data)}
          onInit={handleInit}
          className="rounded-2xl shadow-2xl"
          ref={flipBook}
        >
          {/* Book Cover */}
          <PageCover>{story.title}</PageCover>

          {/* Story Pages */}
          {story.pages.map((page, idx) => (
            <Page key={page.id} number={idx} title={page.title} content={page.content} />
          ))}

          {/* End Cover */}
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>
      </div>

      {/* <div className="container mt-4 text-center">
        <button
          className="mx-2 px-3 py-1 bg-gray-500 text-white rounded"
          onClick={handlePrevPage}
        >
          Previous page
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="mx-2 px-3 py-1 bg-gray-500 text-white rounded"
          onClick={handleNextPage}
        >
          Next page
        </button>
      </div> */}
    </div>
  );
};
