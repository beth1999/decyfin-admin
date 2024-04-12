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

interface VoteProps {
  id: string;
  question: string;
  status: 'OPEN' | 'BLOCK';
  y_vote?: string[];
  n_vote?: string[];
  nt_vote?: string[];
}

interface SurveyProps {
  id: string;
  content: string;
  option1: string[];
  option2: string[];
  option3: string[];
  option4: string[];
  option5: string[];
  created_at: string;
  status: 'OPEN' | 'BLOCK';
}
