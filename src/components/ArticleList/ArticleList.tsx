import { Article } from '../../utils/types';

interface ArticleListProps {
  articles: Article[];
  onSelect: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(article)}
        >
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p>{article.byline}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
