import '../../style/main.scss';
import { Calculator } from '../../logic/Calculator';
import { getLocalStorage } from '../../logic/getLocalStorage';
import { changeTheme } from '../../logic/theme';
import { addListener, fromLocaleStorage } from '../../logic/utils';

export function init() {
  getLocalStorage();
  fromLocaleStorage('changeTheme', 'theme', ['light', 'dark']);
  addListener('changeTheme', 'change', changeTheme);

  const calculator = new Calculator();
  const calcButton = document.querySelectorAll('button');
  calcButton.forEach((button) => {
    button.addEventListener('click', () => {
      const { value, type } = button.dataset as { value: string; type: string };
      calculator.handlerButtons({ value, type });
    });
  });
}
document.addEventListener('DOMContentLoaded', init);
