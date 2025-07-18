
import React from 'react';

interface PageProps {
  content: string;
}

const Page: React.FC<PageProps> = ({ content }) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <p className="text-lg/relaxed text-slate-800 dark:text-slate-200 text-justify whitespace-pre-line">
        {content}
      </p>
    </div>
  );
};

export default Page;
