import { getLocalStorage } from '../getLocalStorage';
import { getValueLocalStorage } from '../utils';

jest.mock('../utils', () => ({
  getValueLocalStorage: jest.fn(),
}));

describe('getLocalStorage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add "dark" class to document body when theme is "dark"', () => {
    (getValueLocalStorage as jest.Mock).mockReturnValueOnce('dark');

    const classListMock = {
      add: jest.fn(),
    };

    const bodyMock = {
      classList: classListMock,
    };

    Object.defineProperty(document, 'body', {
      value: bodyMock,
    });

    getLocalStorage();

    expect(getValueLocalStorage).toHaveBeenCalledWith('theme');
    expect(classListMock.add).toHaveBeenCalledWith('dark');
  });
});
