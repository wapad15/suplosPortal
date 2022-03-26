//interface para  las consultas al api de las imagenes
export interface Image {
    id: number;
    tags: string;
    webformatURL: string;
    views: number;
    likes: number;
    user:  string;
  }