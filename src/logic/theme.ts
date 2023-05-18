import { setValueLocalStorage } from './utils';

export function changeTheme(event: { target: HTMLInputElement }) {
  if (event.target.checked) {
    document.body.classList.add('dark');

    setValueLocalStorage('dark', 'theme');
  } else {
    document.body.classList.remove('dark');

    setValueLocalStorage('light', 'theme');
  }
}
