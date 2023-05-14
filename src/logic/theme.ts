// import { setValueLocalStorage } from './utils';

export function changeTheme(id: string) {
  const checkbox = <HTMLInputElement>document.getElementById(id);
  console.log(checkbox);
  if (checkbox?.checked) {
    document.body.classList.remove('dark');

    // setValueLocalStorage('theme', 'light');
  } else {
    // setValueLocalStorage('theme', 'dark');
    document.body.classList.add('dark');
  }
}
