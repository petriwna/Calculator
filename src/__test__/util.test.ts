import {
  addListener,
  fromLocaleStorage,
  getElementById,
  getInputValue,
  getValueLocalStorage,
  setNodeSelected,
  // setNodeSelected,
  setValueLocalStorage,
} from '../logic/utils';

describe('addListener', () => {
  test('addListener', () => {
    global.document.getElementById = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(addListener('', '', () => {})).toBe(false);
  });
  test('setInnerText true', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          addEventListener: () => {},
        }),
    );
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(addListener('', '', () => {})).toBe(true);
  });
});

describe('getElementById', () => {
  test('getElementById', () => {
    global.document.getElementById = jest.fn();
    expect(getElementById('')).toBe(null);
  });
  test('getElementById true', () => {
    global.document.getElementById = jest.fn(() => <HTMLElement>(<unknown>{ value: 'true' }));
    expect(getElementById('')).toEqual(<HTMLElement>(<unknown>{ value: 'true' }));
  });
});

describe('getInputValue', () => {
  test('getInputValue', () => {
    global.document.getElementById = jest.fn();
    expect(getInputValue('')).toBe('');
  });
  test('getInputValue true', () => {
    global.document.getElementById = jest.fn(() => <HTMLElement>(<unknown>{ value: 'true' }));
    expect(getInputValue('')).toBe('true');
  });
});

describe('setNodeSelected', () => {
  const id = 'mock-id';
  const mockElement = document.createElement('input');
  mockElement.setAttribute('type', 'checkbox');
  mockElement.setAttribute('id', id);
  document.body.appendChild(mockElement);

  test('setNodeSelected', () => {
    setNodeSelected(id, 0);
    expect(mockElement.checked).toBe(false);
  });
  test('setNodeSelected true', () => {
    // global.document.getElementById = jest.fn(() => <HTMLElement>(<unknown>{ selectedIndex: 1 }));
    setNodeSelected(id, 1);
    expect(mockElement.checked).toBe(true);
  });
});

describe('setValueLocalStorage', () => {
  test('setValueLocalStorage', () => {
    expect(setValueLocalStorage('hello', 'key')).toBeUndefined();
  });
});

describe('getValueLocalStorage', () => {
  test('returns value from localStorage when key exists', () => {
    const mockValue = 'hello';
    const mockStorage = {
      getItem: jest.fn().mockReturnValue(mockValue),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
    });
    const result = getValueLocalStorage('key');
    expect(result).toEqual(mockValue);
  });

  test('returns empty string when key is empty', () => {
    expect(getValueLocalStorage('')).toBe('');
  });
});

describe('fromLocaleStorageToDropDown', () => {
  test('fromLocaleStorageToDropDown', () => {
    expect(fromLocaleStorage('', '', [])).toBeUndefined();
  });
  test('fromLocaleStorageToDropDown true', () => {
    localStorage.setItem('key', 'dd');
    expect(fromLocaleStorage('', 'key', [])).toBeUndefined();
  });
});
