import React from 'react';
import { render, screen } from '@testing-library/react';
import ThumbnailList from '../components/ThumbnailList';
import { StripThumbnail } from '../types/striptypes';

const mockedThumbnails: StripThumbnail[] = [];
for (let index = 1; index < 21; index++) {
    mockedThumbnails.push({num: index, img: 'http://example.com'})
}

describe('ThumbnailList', () => {
  it('renders an ul with li elements containing the tumbnails', () => {
    render(<ThumbnailList strips={mockedThumbnails} />)

    const thumbnailList = screen.getByRole('list')

    expect(thumbnailList.childElementCount).toBe(20)
  })
})