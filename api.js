// document.addEventListener('DOMContentLoaded', () => {
//     const tbody = document.getElementById('tbody');
//     const loadButton = document.getElementById('add-task-button');

//     loadButton.addEventListener('click', load_data);
//     // taskInput.addEventListener('keypress', (e) => {
//     //     if (e.key === 'Enter') {
//     //         addTask();
//     //     }
//     // });
//     // load_data();

//     function load_data() {
//         fetch('https://jsonplaceholder.typicode.com/posts')
//         .then((response) => response.json())
//         .then((json) => console.log(json));
//     }
// });
document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.getElementById('tbody');
    const loadButton = document.getElementById('loadButton');
    loadButton.addEventListener('click', function () {
        load_data();
        // fetchData();
    });

    //load Avec Promise
    function load_data() {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => response.json())
        .then(data => {
            //On vide le tableau
            tbody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.userId}</td>
                    <td>${item.title}</td>
                    <td>${item.completed}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur Lors de Chargement de la requeste API :', error));
    }

    // load Avec Async await
    async function fetchData(){
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            const data = await response.json();
            //On vide le tableau
            tbody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.userId}</td>
                    <td>${item.title}</td>
                    <td>${item.completed}</td>
                `;

                tbody.appendChild(row);
            });

        }
        catch (error) {
            console.error('Erreur Erreur Lors de Chargement de la requeste API:', error);
        }  
    }

});