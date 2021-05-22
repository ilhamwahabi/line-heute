import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

import bookmarkCheck from "/bookmark-check.svg";
import { Response } from "../types";
import Card from "../components/Card";

const fetcher = (input: RequestInfo, init: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

function Home() {
  const { data, error } = useSWR<Response>(
    "https://jsonp.afeld.me/?url=https://today.line.me/id/portaljson",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { categories, categoryList } = data.result;
  console.log({ categories, categoryList });

  return (
    <div>
      <div className="flex justify-between flex-wrap mt-12">
        {categoryList.map((categoryItem, categoryItemIndex) =>
          categoryItem.name ? (
            <a
              href={`#${categoryItem.name}`}
              className="w-32 lg:w-40 border-gray-600 border-4 rounded-lg text-sm lg:text-base text-center p-4 cursor-pointer mb-4 hover:bg-gray-600 hover:text-white transition"
              key={categoryItem.id}
            >
              {categoryItem.name}
            </a>
          ) : (
            <div className="w-40" key={categoryItemIndex}></div>
          )
        )}
      </div>
      <div className="mt-8">
        {categories.map((category) => {
          // if (!category.name) return null;

          return (
            <div className="pt-4 mb-12" id={category.name} key={category.id}>
              <div className="px-6 py-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl text-white cursor-default">
                  {category.name}
                </h2>
              </div>
              <div className="mt-8">
                {category.templates.map((template) => {
                  // if (!template.title) return null;

                  return (
                    <div className="mb-4" key={template.id}>
                      <h3 className="text-xl w-max pb-1 border-b-2 border-gray-800 cursor-default mb-8">
                        {template.title}
                      </h3>
                      <div>
                        {template.sections.map((section, sectionIndex) => (
                          <div
                            className="flex flex-col lg:flex-row flex-wrap justify-between"
                            key={sectionIndex}
                          >
                            {section.articles.map((article) => {
                              if (!article.title) return null;
                              return (
                                <Card article={article} key={article.id} />
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
