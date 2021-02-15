export interface Author {
  name: string
  avatar_path?: string
  rating?: string
}

export interface Review {
  id: string
  author: string
  author_details: Author
  content: string
  created_at: string
  updated_at: string
  url: string
}
