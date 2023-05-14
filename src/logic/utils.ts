export function addListener(id: string, eventType: string, callback: any) {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener(eventType, callback);
    return true;
  }
  return false;
}

export function getInputValue(id: string) {
  const input = <HTMLInputElement>document.getElementById(id);
  if (input) {
    return input.value;
  }
  return '';
}

export function setValueLocalStorage(value: any, key: any) {
  localStorage.setItem(key, value);
}

export function getValueLocalStorage(key: string) {
  if (Object.hasOwnProperty.call(localStorage, key)) {
    return localStorage.getItem(key);
  }
  return '';
}

export function setNodeSelected(id: string, selectIndex: number) {
  const node = <HTMLInputElement>document.getElementById(id);
  if (selectIndex === 1) {
    node.checked = true;
  }
}

export function fromLocaleStorage(id: string, key: string, arrayValue: string[]) {
  if (getValueLocalStorage(key)) {
    // @ts-ignore
    setNodeSelected(id, arrayValue.indexOf(getValueLocalStorage(key)));
  } else {
    setValueLocalStorage(getInputValue(id), key);
  }
}
