import React from "react";

import Card from "../components/Card";
import useLocalStorage from "../hooks/useLocalStorage";
import { Article } from "../types";

function Bookmark() {
  const [bookmarks] = useLocalStorage<Article[]>("line-haute-bookmarks", []);

  return (
    <div>
      <div className="mt-8">
        <h2 className="text-gray-700 font-medium text-2xl">Daftar Bookmark</h2>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap justify-between mt-12">
        {bookmarks.map((article) => {
          if (!article.title) return null;
          return <Card article={article} key={article.id} />;
        })}
      </div>
    </div>
  );
}

export default Bookmark;
