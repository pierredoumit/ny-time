import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockArticles } from '../../utils/mock/articles';
import ArticleDetail from './index';

const mockArticle = mockArticles[0];

describe('ArticleDetail Component', () => {
  it('renders article details correctly', () => {
    const onBackMock = jest.fn();

    render(<ArticleDetail article={mockArticle} onBack={onBackMock} />);

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
    expect(screen.getByText('Read more')).toHaveAttribute('href', mockArticle.url);
  });

  it('calls onBack when Back button is clicked', () => {
    const onBackMock = jest.fn();

    render(<ArticleDetail article={mockArticle} onBack={onBackMock} />);

    fireEvent.click(screen.getByText('Back'));

    expect(onBackMock).toHaveBeenCalled();
  });

  it('does not render when article is null', () => {
    const onBackMock = jest.fn();

    render(<ArticleDetail article={null} onBack={onBackMock} />);

    expect(screen.queryByText('Back')).not.toBeInTheDocument();
    expect(screen.queryByText('Read more')).not.toBeInTheDocument();
  });
});
