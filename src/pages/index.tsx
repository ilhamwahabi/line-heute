import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

import bookmarkEmpty from "../bookmark-empty.svg";
import bookmarkFull from "../bookmark-full.svg";
import bookmarkCheck from "../bookmark-check.svg";
import useLocalStorage from "../hooks/useLocalStorage";
import { Article, Response } from "../types";

const fetcher = (input: RequestInfo, init: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

function Home() {
  const { data, error } = useSWR<Response>(
    "https://jsonp.afeld.me/?url=https://today.line.me/id/portaljson",
    fetcher
  );
  const [bookmarks, setBookmarks] = useLocalStorage<Article[]>(
    "line-haute-bookmarks",
    []
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { categories, categoryList } = data.result;
  console.log({ categories, categoryList });

  const dummyCategoriItems = [
    {
      id: -1,
      lastModTime: -1,
      name: "",
      type: -1,
    },
    {
      id: -1,
      lastModTime: -1,
      name: "",
      type: -1,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center justify-start p-8">
      <div className="w-full lg:w-3xl">
        <Link to="/">
          <h1 className="text-gray-700 font-medium text-3xl">LINE Heute</h1>
        </Link>
        <div className="flex justify-between flex-wrap mt-12">
          {categoryList.concat(...dummyCategoriItems).map((categoryItem) =>
            categoryItem.name ? (
              <a
                href={`#${categoryItem.name}`}
                className="w-32 lg:w-40 border-gray-600 border-4 rounded-lg text-sm lg:text-base text-center p-4 cursor-pointer mb-4 hover:bg-gray-600 hover:text-white transition"
                key={categoryItem.id}
              >
                {categoryItem.name}
              </a>
            ) : (
              <div className="w-40"></div>
            )
          )}
        </div>
        <div className="mt-8">
          {categories.map((category) => {
            // if (!category.name) return null;

            return (
              <div className="pt-4 mb-12" id={category.name}>
                <div className="px-6 py-4 bg-gray-800 rounded-lg">
                  <h2 className="text-2xl text-white cursor-default">
                    {category.name}
                  </h2>
                </div>
                <div className="mt-8">
                  {category.templates.map((template) => {
                    // if (!template.title) return null;

                    return (
                      <div className="mb-4">
                        <h3 className="text-xl w-max pb-1 border-b-2 border-gray-800 cursor-default mb-8">
                          {template.title}
                        </h3>
                        <div>
                          {template.sections.map((section) => (
                            <div className="flex flex-col lg:flex-row flex-wrap justify-between">
                              {section.articles.map((article) => {
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
                                        <h4 className="text-lg">
                                          {article.title}
                                        </h4>
                                        <p className="text-sm mt-2 font-bold">
                                          {article.publisher}
                                        </p>
                                      </div>
                                      <img
                                        onClick={(event) => {
                                          event.preventDefault();
                                          if (
                                            bookmarks.findIndex(
                                              (bookmark) =>
                                                bookmark.id === article.id
                                            ) !== -1
                                          ) {
                                            setBookmarks(
                                              bookmarks.filter(
                                                (bookmark) =>
                                                  bookmark.id !== article.id
                                              )
                                            );
                                          } else {
                                            setBookmarks(
                                              bookmarks.concat(article)
                                            );
                                          }
                                        }}
                                        src={
                                          bookmarks.findIndex(
                                            (bookmark) =>
                                              bookmark.id === article.id
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
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/bookmark">
        <img
          src={bookmarkCheck}
          className="fixed right-0 bottom-0 p-8"
          alt=""
        />
      </Link>
    </div>
  );
}

export default Home;
