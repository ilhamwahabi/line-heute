export interface CategoryItem {
  id: number;
  lastModTime: number;
  name: string;
  type: number;
}

export type CategoryList = CategoryItem[];

export interface Article {
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

export interface Category {
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

export type Categories = Category[];

export interface Response {
  code: number;
  message: string;
  result: {
    lastModTime: number;
    parentCategoryId: number;
    categories: Categories;
    categoryList: CategoryList;
  };
}