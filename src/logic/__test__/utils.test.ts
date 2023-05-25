import {
  addListener,
  fromLocaleStorage,
  getElementById,
  getInputValue,
  getValueLocalStorage,
  setNodeSelected,
  setValueLocalStorage,
} from '../utils';

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
  afterEach(() => {
    jest.clearAllMocks();
  });

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
  test('getValueLocalStorage', () => {
    expect(getValueLocalStorage('')).toBe('');
  });
  test('getValueLocalStorage true', () => {
    const hasOwnPropertySpy = jest.spyOn(Object.prototype, 'hasOwnProperty');
    hasOwnPropertySpy.mockReturnValue(true);
    jest.spyOn(localStorage, 'getItem').mockReturnValue('hello');

    expect(getValueLocalStorage('key')).toEqual('hello');

    hasOwnPropertySpy.mockRestore();
    jest.restoreAllMocks();
  });
});

describe('fromLocaleStorage', () => {
  test('fromLocaleStorage', () => {
    expect(fromLocaleStorage('', '', [])).toBeUndefined();
  });
  test('fromLocaleStorageToDropDown true', () => {
    localStorage.setItem('key', 'dd');
    expect(fromLocaleStorage('', 'key', [])).toBeUndefined();
  });
});
