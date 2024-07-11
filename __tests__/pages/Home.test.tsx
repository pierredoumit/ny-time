import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Home, { getServerSideProps } from '../../src/pages/index';
import { mockArticles } from '../../src/utils/mock/articles';

describe('Home', () => {
  it('renders articles', async () => {
    await act(async () => {
      render(<Home initialArticles={mockArticles} initialPeriod={1} />);
    });

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  it('changes period and fetches new articles', async () => {
    await act(async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockArticles },
      });

      render(<Home initialArticles={[]} initialPeriod={1} />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Select period:'), {
        target: { value: '7' },
      });
    });

    expect(axios.get).toHaveBeenCalledWith('/api/nyt', { params: { period: 7 } });
  });

  it('fetches initial articles in getServerSideProps', async () => {
    let result;

    await act(async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockArticles },
      });

      const context = {
        query: { period: '1' },
        req: { headers: { host: 'localhost', 'x-forwarded-proto': 'http' } },
      } as unknown as GetServerSidePropsContext;

      result = await getServerSideProps(context);
    });

    expect(result).toEqual({
      props: {
        initialArticles: mockArticles,
        initialPeriod: 1,
      },
    });
  });
});
