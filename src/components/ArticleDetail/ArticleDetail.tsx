import { Article } from '../../utils/types';

interface ArticleDetailProps {
  article: Article | null;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  if (!article) return null;

  return (
    <div className="p-4">
      <button className="mb-4 text-blue-500" onClick={onBack}>
        Back
      </button>
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p>{article.abstract}</p>
      <a href={article.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default ArticleDetail;
