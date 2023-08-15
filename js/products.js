const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

fetch(URL)
.then (response => response.json())
.then (data => console.log(data));
    