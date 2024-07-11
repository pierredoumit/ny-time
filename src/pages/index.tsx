import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ArticleList from '../components/ArticleList';
import { Article } from '../utils/types';

interface HomeProps {
  initialArticles: Article[];
  initialPeriod: number;
}

const Home: React.FC<HomeProps> = ({ initialArticles, initialPeriod }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState<boolean>(false);
  const [period, setPeriod] = useState<number>(initialPeriod);
  const router = useRouter();

  useEffect(() => {
    // this is to prevent refetching articles if the user clicks on back from article details
    const cachedArticles = sessionStorage.getItem(`articles_${period}`);
    if (cachedArticles) {
      setArticles(JSON.parse(cachedArticles));
      return;
    }

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/nyt`, {
          params: { period },
        });
        setArticles(response.data.results);
        sessionStorage.setItem(`articles_${period}`, JSON.stringify(response.data.results));
      } catch (error) {
        console.error('Error fetching articles', error);
      } finally {
        setLoading(false);
      }
    };

    if (period !== initialPeriod) {
      fetchArticles();
    }
  }, [period, initialPeriod]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(Number(e.target.value));
  };

  const handleArticleSelect = (article: Article) => {
    router.push({
      pathname: `/article/${article.id}`,
      query: { period },
    });
  };

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <div className="mb-4">
        <label htmlFor="period" className="mr-2 text-gray-700">
          Select period:
        </label>
        <select id="period" value={period} onChange={handlePeriodChange} className="border border-gray-300 p-2 rounded">
          <option value={1}>1 day</option>
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#4A90E2" loading={loading} size={50} />
        </div>
      ) : (
        <ArticleList articles={articles} onSelect={handleArticleSelect} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const period = context.query.period ? parseInt(context.query.period as string, 10) : 1;
  let initialArticles: Article[] = [];

  try {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const response = await axios.get(`${baseUrl}/api/nyt`, {
      params: { period },
    });
    initialArticles = response.data.results;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  return {
    props: {
      initialArticles,
      initialPeriod: period,
    },
  };
};

export default Home;
