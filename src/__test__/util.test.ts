import { addListener } from '../logic/utils';

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
