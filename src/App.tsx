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

  return (
    <div className="bg-blue-500 text-white min-h-screen w-full flex items-center justify-center text-5xl">
      LINE Heute
    </div>
  );
}

export default App;
