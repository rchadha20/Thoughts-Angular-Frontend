export interface Blogs {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  author: string;
  creationDate: Date;
  favorite: boolean;
}
