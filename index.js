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
  if (modal) {
    modal.style.display = 'flex';
    createTable();
  }
});

if (closeButton) {
  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
    document.getElementById('tbody').innerHTML = '';
  });
}

window.addEventListener('click', function(e) {
  if (e.target === modal) modal.style.display = 'none';
});

function getSelectedCoffees() {
    const fieldsets = document.querySelectorAll('fieldset');
    console.log(fieldsets);
    const data = [];
    for (const fs of fieldsets) {
        const coffee = fs.querySelector('select[name="coffee"]')?.value
            .replace('espresso', 'Эспрессо')
            .replace('capuiccino', 'Капучино')
            .replace('cacao', 'Какао');
        const milk = fs.querySelector('input[name="milk"]:checked')?.value
            .replace('usual', 'Обычное')
            .replace('no-fat', 'Обезжиренное')
            .replace('soy', 'Соевое')
            .replace('coconut', 'Кокосовое');
        const options = fs.querySelectorAll('input[name="options"]:checked');
        
        let optionsStr = '';
        for (const option of options) {
            optionsStr += option?.value + ' ';
        }
        optionsStr = optionsStr.replace('whipped cream', 'Взбитые сливки,')
            .replace('marshmallow', 'Зефирки,')
            .replace('chocolate', 'Шоколад')
            .replace('cinnamon', 'Корица');

        data.push([coffee, milk, optionsStr]);
    }
    console.log(data)
    return data
}

function makeTable(data) {
    const tbody = document.getElementById('tbody');
    for (const row of data) {
        const rowEl = makeRow(row);
        tbody.appendChild(rowEl);
    }
    return tbody;
}

function makeRow(rowData) {
    const row = document.createElement('tr');
    for (const val of rowData) {
        const el = document.createElement('td');
        el.innerText = val;
        row.appendChild(el);
    }
    return row;
}

function createTable() {
    const data = getSelectedCoffees();
    makeTable(data);
}