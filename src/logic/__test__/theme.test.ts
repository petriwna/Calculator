import { changeTheme } from '../theme';
import * as utils from '../utils';

jest.mock('../utils');

describe('changeTheme', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add "dark" class to body and set "dark" theme in local storage when the checkbox is checked', () => {
    const mockEvent = {
      target: { checked: true } as HTMLInputElement,
    } as Event & { target: HTMLInputElement };

    const setValueLocalStorageSpy = jest.spyOn(utils, 'setValueLocalStorage');

    changeTheme(mockEvent);

    expect(document.body.classList.contains('dark')).toBe(true);

    expect(setValueLocalStorageSpy).toHaveBeenCalledWith('dark', 'theme');

    setValueLocalStorageSpy.mockRestore();
  });

  test('should remove "dark" class from body and set "light" theme in local storage when the checkbox is unchecked', () => {
    const mockEvent = {
      target: { checked: false } as HTMLInputElement,
    } as Event & { target: HTMLInputElement };

    const setValueLocalStorageSpy = jest.spyOn(utils, 'setValueLocalStorage');

    changeTheme(mockEvent);

    expect(document.body.classList.contains('dark')).toBe(false);

    expect(setValueLocalStorageSpy).toHaveBeenCalledWith('light', 'theme');

    setValueLocalStorageSpy.mockRestore();
  });
});
