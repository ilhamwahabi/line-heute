import React from "react";
import useSWR from "swr";

interface CategoryItem {
  id: number;
  lastModTime: number;
  name: string;
  type: number;
}

type CategoryList = CategoryItem[];

interface Article {
  ageLimit: boolean;
  badgeText: string;
  categoryId: number;
  categoryName: string;
  id: number;
  postId: string;
  publishTimeUnix: number;
  publisher: string;
  publisherId: string;
  publisherImageCdnHash: string;
  source: string;
  status: string;
  thumbnail: {
    type: string;
    hash: string;
    quality: number;
  };
  title: string;
  type: number;
  url: {
    hash: string;
    url: string;
  };
}

interface Category {
  allAdLazyloadingOn: boolean;
  id: number;
  lastModTime: number;
  name: string;
  order: number;
  rankingList: null;
  source: number;
  type: number;
  templates: {
    id: string;
    type: number;
    sections: {
      type: number;
      articles: Article[];
    }[];
    title?: string;
    layoutId?: number;
    meta?: {
      categoryId: number;
      displayUserName: boolean;
      personalizedTitle: string;
    };
  }[];
}

type Categories = Category[];

interface Response {
  code: number;
  message: string;
  result: {
    lastModTime: number;
    parentCategoryId: number;
    categories: Categories;
    categoryList: CategoryList;
  };
}

const fetcher = (input: RequestInfo, init: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

function App() {
  const { data, error } = useSWR<Response>(
    "https://jsonp.afeld.me/?url=https://today.line.me/id/portaljson",
    fetcher
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
    <div
      style={{ fontFamily: "Roboto, sans-serif" }}
      className="bg-gray-50 min-h-screen w-full flex flex-col items-center justify-start p-8"
    >
      <div className="w-full lg:w-3xl">
        <div>
          <h1 className="text-green-800 font-medium text-3xl">LINE Heute</h1>
        </div>
        <div className="flex justify-between flex-wrap mt-12">
          {categoryList.concat(...dummyCategoriItems).map((categoryItem) =>
            categoryItem.name ? (
              <div
                className="w-32 lg:w-40 border-gray-600 border rounded-lg text-sm lg:text-base text-center p-4 cursor-pointer mb-4"
                key={categoryItem.id}
              >
                {categoryItem.name}
              </div>
            ) : (
              <div className="w-40"></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
