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
  const select = fieldset.querySelector('select');
  select.selectedIndex = 0;
  const radios = fieldset.querySelectorAll('input[type="radio"]');
  radios.forEach((r, idx) => r.checked = idx === 0);
  fieldset.querySelectorAll('input[type="checkbox"]').forEach(ch => ch.checked = false);
  const oldButton = fieldset.querySelector('.remove-button');
  if (oldButton) oldButton.remove();
  fieldset.style.position = 'relative';
  const rem = createRemoveButton();
  rem.style.position = 'absolute';
  rem.style.top = '8px';
  rem.style.right = '8px';
  fieldset.appendChild(rem);
}

document.querySelectorAll('.beverage').forEach(fs => prepareNewBeverage(fs));
updateNumbers();

addButton.addEventListener('click', () => {
  const template = document.querySelector('.beverage');
  const clone = template.cloneNode(true);
  prepareNewBeverage(clone);
  form.insertBefore(clone, addButton.parentNode);
  updateNumbers();
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (modal) modal.style.display = 'flex';
});

if (closeButton) {
  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });
}

window.addEventListener('click', function(e) {
  if (e.target === modal) modal.style.display = 'none';
});
