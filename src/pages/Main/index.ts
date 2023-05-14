import '../../style/main.scss';
import { getLocalStorage } from '../../logic/getLocalStorage';
import { fromLocaleStorage, setValueLocalStorage } from '../../logic/utils';

export function init() {
  getLocalStorage();
  fromLocaleStorage('changeTheme', 'theme', ['light', 'dark']);

  const checkbox = <HTMLInputElement>document.getElementById('changeTheme');
  checkbox.addEventListener('change', () => {
    if (checkbox?.checked) {
      document.body.classList.add('dark');

      setValueLocalStorage('dark', 'theme');
    } else {
      document.body.classList.remove('dark');

      setValueLocalStorage('light', 'theme');
    }
  });
}
document.addEventListener('DOMContentLoaded', init);
