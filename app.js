document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Récuperer les tasks enregistrées dans le local storage
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim(); // Supprime les espaces blancs inutiles

        //Texte de la tâche no vide avant de l'ajouter
        if (taskText === '') {
            alert('Veuillez entrer une tâche !');
            return;
        }

        // On cree un objet ligne par ligne
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="task-actions">
                <button class="complete-button">✔</button>
                <button class="delete-button">✖</button>
            </div>
        `;

        // Gérer le bouton "Compléter"
        const completeButton = li.querySelector('.complete-button');
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed'); // Pour retirer la tache
            saveTasks(); // On sauvegarde la tache dans le local storage
        });

        // Gérer le bouton "Supprimer" on recuperer le bouton de maniere unique
        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li); // Supprime l'élément de la liste
            saveTasks(); // Sauvegarder après suppression
        });

        taskList.appendChild(li); // Ajoute la nouvelle tâche à la liste
        taskInput.value = ''; // Vide le champ de saisie
        saveTasks(); // Sauvegarder la nouvelle tâche
    }

    function saveTasks() {
        // Sauvegarde la liste complète des tâches dans localStorage
        localStorage.setItem('tasks', taskList.innerHTML);
    }

    function loadTasks() {
        // Charge les tâches depuis localStorage
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            taskList.innerHTML = savedTasks;
            // Réattacher les écouteurs d'événements car innerHTML les supprime
            attachEventListenersToTasks();
        }
    }

    function attachEventListenersToTasks() {
        // Fonction pour réattacher les événements aux boutons après le chargement
        taskList.querySelectorAll('li').forEach(li => {
            const completeButton = li.querySelector('.complete-button');
            const deleteButton = li.querySelector('.delete-button');

            if (completeButton) {
                completeButton.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    saveTasks();
                });
            }

            if (deleteButton) {
                deleteButton.addEventListener('click', () => {
                    taskList.removeChild(li);
                    saveTasks();
                });
            }
        });
    }
});