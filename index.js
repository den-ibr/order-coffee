document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const addButton = document.querySelector('.add-button');
  
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
      const removeFormButton = createRemoveButton();
      removeFormButton.style.position = 'absolute';
      removeFormButton.style.top = '8px';
      removeFormButton.style.right = '8px';
      fieldset.appendChild(removeFormButton);
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
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Заказ принят!');
    });
  });
  