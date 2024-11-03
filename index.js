const container = document.getElementById('container');
const addItemBtn = document.getElementById('add-item');
const saveBtn = document.getElementById('save');
const resultDiv = document.getElementById('result');

let items = [];

function createItem(text1, text2) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <input type="text" value="">
        <input type="text" value="">
        <button class="move-up">↑</button>
        <button class="move-down">↓</button>
        <button class="delete">X</button>
    `;
    item.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const index = Array.from(container.children).indexOf(item);
            const inputs = item.querySelectorAll('input');
            items[index] = {
                text1: inputs[0].value,
                text2: inputs[1].value
            };
        });
    });
    return item;
}

function addItem() {
    const newItem = createItem('', '');
    container.appendChild(newItem);
    items.push({text1: '', text2: ''});
    newItem.querySelector('.move-up').addEventListener('click', moveUp);
    newItem.querySelector('.move-down').addEventListener('click', moveDown);
    newItem.querySelector('.delete').addEventListener('click', removeItem);
}

function moveDown(event) {
    const item = event.target.parentNode;
    const index = Array.from(container.children).indexOf(item);
    if (index < container.children.length - 1) {
        container.insertBefore(item.nextSibling, item);
        items.splice(index, 1);
        items.splice(index + 1, 0, items[index]);
    }
}

function moveUp(event) {
    const item = event.target.parentNode;
    const index = Array.from(container.children).indexOf(item);
    if (index > 0) {
        container.insertBefore(item, item.previousSibling);
        items.splice(index, 1);
        items.splice(index - 1, 0, items[index]);
    }
}

function removeItem(event) {
    const item = event.target.parentNode;
    const index = Array.from(container.children).indexOf(item);
    container.removeChild(item);
    items.splice(index, 1);
}

function save() {
    const values = items.map(item => [item.text1, item.text2]);
    const result = JSON.stringify(values);
    resultDiv.textContent = result;
}

addItemBtn.addEventListener('click', addItem);
saveBtn.addEventListener('click', save);