import Index from './index';
import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('app tests', () => {
    test('Index should return div', () => {
        const { getByText } = render(<Index />);
        // @ts-ignore
        expect(getByText('My React App!')).toBeInTheDocument();
    });
});
