import { BookDto } from "./BookDto";

export type BookPage = {
  content: BookDto[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}