import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Article } from '../../utils/types';

interface ArticleDetailProps {
  article: Article | null;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(!article);

  useEffect(() => {
    if (article) {
      setLoading(false);
    }
  }, [article]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#4A90E2" loading={loading} size={50} />
      </div>
    );
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  const mainImage = article.media?.[0]?.['media-metadata']?.reduce((largest, current) => {
    return current.width * current.height > largest.width * largest.height ? current : largest;
  }, article.media[0]['media-metadata'][0]);

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        Back
      </button>
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p className="text-gray-600">{article.byline}</p>
      <p className="text-gray-500">{article.published_date}</p>
      <p className="text-gray-500">{article.section}</p>
      {mainImage && (
        <div className="my-4">
          <Image src={mainImage.url} alt={article.title} width={mainImage.width} height={mainImage.height} priority />
        </div>
      )}
      <p>{article.abstract}</p>
      <p className="text-gray-500">
        <strong>Keywords:</strong> {article.adx_keywords}
      </p>
      <p className="text-gray-500">
        <strong>Source:</strong> {article.source}
      </p>
      {article.des_facet.length > 0 && (
        <p className="text-gray-500">
          <strong>Description Facets:</strong> {article.des_facet.join(', ')}
        </p>
      )}
      {article.org_facet.length > 0 && (
        <p className="text-gray-500">
          <strong>Organization Facets:</strong> {article.org_facet.join(', ')}
        </p>
      )}
      {article.per_facet.length > 0 && (
        <p className="text-gray-500">
          <strong>Person Facets:</strong> {article.per_facet.join(', ')}
        </p>
      )}
      {article.geo_facet.length > 0 && (
        <p className="text-gray-500">
          <strong>Geographic Facets:</strong> {article.geo_facet.join(', ')}
        </p>
      )}
      <a href={article.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, period } = context.query;
  let article = null;

  try {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const response = await axios.get(`${baseUrl}/api/nyt`, {
      params: {
        period,
        id,
      },
    });
    article = response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
  }

  return {
    props: {
      article: article || null,
    },
  };
};

export default ArticleDetail;
