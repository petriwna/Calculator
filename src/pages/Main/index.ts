import '../../style/main.scss';

export function init() {
  const container = document.getElementById('container');
  const newContent = document.createTextNode('This is new content');

  container?.appendChild(newContent);
}
document.addEventListener('DOMContentLoaded', init);
