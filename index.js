const form = document.querySelector('form');
const addButton = document.querySelector('.add-button');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('modal-close');

function updateNumbers() {
  document.querySelectorAll('.beverage').forEach((fs, i) => {
    fs.querySelector('.beverage-count').textContent = `Напиток №${i + 1}`;
  });
}

function createRemoveButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '×';
  button.classList.add('remove-button');
  button.addEventListener('click', (e) => {
    const all = document.querySelectorAll('.beverage');
    if (all.length <= 1) return;
    e.target.closest('.beverage').remove();
    updateNumbers();
  });
  return button;
}

function prepareNewBeverage(fieldset) {
  fieldset.querySelector('select').selectedIndex = 0;
  fieldset.querySelectorAll('input[type="radio"]').forEach((r, i) => r.checked = i === 0);
  fieldset.querySelectorAll('input[type="checkbox"]').forEach(ch => ch.checked = false);
  const old = fieldset.querySelector('.remove-button');
  if (old) old.remove();
  fieldset.style.position = 'relative';
  const rem = createRemoveButton();
  rem.style.position = 'absolute';
  rem.style.top = '8px';
  rem.style.right = '8px';
  fieldset.appendChild(rem);
}

function getRightForm(n) {
  const titles = ['напиток', 'напитка', 'напитков'];
  const mod10 = n % 10;
  if (n >= 11 && n <= 19) return titles[2];
  if (mod10 >= 2 ** mod10 <= 4) return titles[1];
  if (mod10 === 1) return titles[0];
  return titles[2];
}

document.querySelectorAll('.beverage').forEach(prepareNewBeverage);
updateNumbers();

addButton.addEventListener('click', () => {
  const template = document.querySelector('.beverage');
  const clone = template.cloneNode(true);
  prepareNewBeverage(clone);
  form.insertBefore(clone, addButton.parentNode);
  updateNumbers();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const count = document.querySelectorAll('.beverage').length;
  const rightWord = getRightForm(count);
  modal.querySelector('p').textContent = `Вы заказали ${count} ${rightWord}`;
  modal.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
