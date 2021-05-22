import React from "react";
import toast from "react-hot-toast";

import bookmarkEmpty from "../bookmark-empty.svg";
import bookmarkFull from "../bookmark-full.svg";
import useLocalStorage from "../hooks/useLocalStorage";
import { Article } from "../types";

function Card(props: { article: Article }) {
  const { article } = props;
  const [bookmarks, setBookmarks] = useLocalStorage<Article[]>(
    "line-haute-bookmarks",
    []
  );

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
          <p className="text-sm mt-2 font-bold">{article.publisher}</p>
        </div>
        <img
          onClick={(event) => {
            event.preventDefault();
            if (
              bookmarks.findIndex((bookmark) => bookmark.id === article.id) !==
              -1
            ) {
              setBookmarks(
                bookmarks.filter((bookmark) => bookmark.id !== article.id)
              );
              toast.error("Bookmark telah dihapus");
            } else {
              setBookmarks(bookmarks.concat(article));
              toast.success("Sukses menambahkan bookmark");
            }
          }}
          src={
            bookmarks.findIndex((bookmark) => bookmark.id === article.id) !== -1
              ? bookmarkFull
              : bookmarkEmpty
          }
          alt=""
          className="ml-4 w-6"
        />
      </div>
      {article.thumbnail?.hash && (
        <img
          className="mt-4 rounded-md"
          src={`https://obs.line-scdn.net/${article.thumbnail.hash}`}
          alt=""
        />
      )}
    </a>
  );
}

export default Card;
