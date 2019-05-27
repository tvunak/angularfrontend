import { ArticleDetail } from './articleDetails.model';

export class Article{
    id: number;
    name: string;
    date: Date;
    time: string;
    price: number; 
    articleDetail: ArticleDetail;
}

