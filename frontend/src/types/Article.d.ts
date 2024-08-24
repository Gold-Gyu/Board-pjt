export interface Article {
  id: number;
  category: string;
  title: string;
  content: string;
  boardId: number;
  author: string;
  authorId: number;
  publishDate: string;
  likeCount: number;
  commentCount: number;
  views: number;
}
