import { Category } from '../ArticleCategorySection/ArticleCategorySection.type';
import { MainArticleSectionProps } from '../MainArticleSection/MainArticleSection.type';

export interface CategoryLists {
  fields: {
    title: string;
    categories: Category[];
  };
}

export type SupportSection = MainArticleSectionProps & {
  dropdownLists: CategoryLists[];
};
