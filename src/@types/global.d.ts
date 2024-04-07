type PostProps = {
  id: string;
  author_id: string;
  title: string;
  content: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  category: {
    id: string;
    name: string;
  };
};

interface CategoryProps {
  id: string;
  name: string;
  created_at: string;
}
