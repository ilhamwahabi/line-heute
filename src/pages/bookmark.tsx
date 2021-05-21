import React from "react";
import { Link } from "react-router-dom";

import bookmarkEmpty from "../bookmark-empty.svg";
import bookmarkFull from "../bookmark-full.svg";
import useLocalStorage from "../hooks/useLocalStorage";
import { Article } from "../types";

function Bookmark() {
  const [bookmarks, setBookmarks] = useLocalStorage<Article[]>(
    "line-haute-bookmarks",
    []
  );

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center justify-start p-8">
      <div className="w-full lg:w-3xl">
        <Link to="/">
          <h1 className="text-gray-700 font-medium text-3xl">LINE Heute</h1>
        </Link>
        <div className="mt-8">
          <h2 className="text-gray-700 font-medium text-2xl">
            Daftar Bookmark
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap justify-between mt-12">
          {bookmarks.map((article) => {
            if (!article.title) return null;

            return (
              <a
                href={article.url?.url}
                target="_blank"
                rel="noopener"
                className="mb-8 w-full lg:w-5/12"
              >
                <div className="flex items-start">
                  <div>
                    <h4 className="text-lg">{article.title}</h4>
                    <p className="text-sm mt-2 font-bold">
                      {article.publisher}
                    </p>
                  </div>
                  <img
                    onClick={(event) => {
                      event.preventDefault();
                      if (
                        bookmarks.findIndex(
                          (bookmark) => bookmark.id === article.id
                        ) !== -1
                      ) {
                        setBookmarks(
                          bookmarks.filter(
                            (bookmark) => bookmark.id !== article.id
                          )
                        );
                      } else {
                        setBookmarks(bookmarks.concat(article));
                      }
                    }}
                    src={
                      bookmarks.findIndex(
                        (bookmark) => bookmark.id === article.id
                      ) !== -1
                        ? bookmarkFull
                        : bookmarkEmpty
                    }
                    alt=""
                    className="ml-4 w-6"
                  />
                </div>
                <img
                  className="mt-4 rounded-md"
                  src={`https://obs.line-scdn.net/${article.thumbnail?.hash}`}
                  alt=""
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
