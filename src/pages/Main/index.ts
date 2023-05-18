import '../../style/main.scss';
import { getLocalStorage } from '../../logic/getLocalStorage';
import { changeTheme } from '../../logic/theme';
import { addListener, fromLocaleStorage } from '../../logic/utils';

export function init() {
  getLocalStorage();
  fromLocaleStorage('changeTheme', 'theme', ['light', 'dark']);
  addListener('changeTheme', 'change', changeTheme);
}
document.addEventListener('DOMContentLoaded', init);
