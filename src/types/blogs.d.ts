type BlogType = {
  title: string;
  description: string;
  id: string;
  image: string;
  name: string;
  likes?: string[];
};
type CommentType = {
  id: string;
  text?: string;
  userId?: string;
  name?: string;
  profileImage?: string;
};
