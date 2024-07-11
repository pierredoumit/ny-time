import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockArticles } from '../../utils/mock/articles';
import ArticleList from './ArticleList';

describe('ArticleList Component', () => {
  it('renders a list of articles', () => {
    const onSelectMock = jest.fn();

    render(<ArticleList articles={mockArticles} onSelect={onSelectMock} />);

    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(screen.getByText(article.byline)).toBeInTheDocument();
    });
  });

  it('calls onSelect when an article is clicked', () => {
    const onSelectMock = jest.fn();

    render(<ArticleList articles={mockArticles} onSelect={onSelectMock} />);

    fireEvent.click(screen.getByText(mockArticles[0].title));

    expect(onSelectMock).toHaveBeenCalledWith(mockArticles[0]);
  });
});
