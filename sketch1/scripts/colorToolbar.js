{
    let items = document.querySelectorAll('div.list-item.size');
    let len = items.length;
    for (let counter = 0; counter < len; counter++) {
        //because data-size actually is a radius of circle (brush);
        let dataSize = items[counter].getAttribute('data-size');
        items[counter].style.width = dataSize * 1.5 + 'px';
        items[counter].style.height = items[counter].getAttribute('data-size') * 1.5 + 'px';
        //data size is char , convert to integer to avoid confusion in calculations
        items[counter].parentNode.style.height = Math.max(parseInt(items[counter].getAttribute('data-size')) + 5, 18) * 1.5 + 'px';
        items[counter].parentNode.style.width = items[len - 1].getAttribute('data-size') * 2 + 'px';

        //because some sizes are so small and thus unclickable
        items[counter].parentNode.addEventListener('click', () => {
            sketch.width = items[counter].getAttribute('data-size');
            document.getElementById('size').text = 'Size : ' + items[counter].getAttribute('data-size');
        });
    }
}

{
    let items = document.querySelectorAll('div.list-item.color');
    let len = items.length;
    for (let counter = 0; counter < len; counter++) {
        items[counter].style.backgroundColor = items[counter].getAttribute('data-color');
        items[counter].addEventListener('click', () => {
            sketch.color = items[counter].getAttribute('data-color');
        });
    }
}
