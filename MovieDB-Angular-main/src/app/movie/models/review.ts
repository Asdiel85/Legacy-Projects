export interface IReview {
  author: string;
  content: string;
  url: string;
}
export interface IReviews {
  pages: number;
  results: Array<IReview>;
}
