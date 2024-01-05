const addBtn = document.getElementById('addBtn')
const modalAdd = document.getElementById('modalAdd')
const cancelBtn = document.getElementById('cancelBtn')
const saveBtn = document.getElementById('saveBtn')
const titleForm = document.getElementById('titleForm')
const descForm = document.getElementById('descForm')
const listTask = document.querySelector('.list-task')
const searchInput = document.getElementById('inputSearch')

// Retrieve tasks from Local Storage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

// Display existing tasks
renderTasks()

// Function to render tasks in the list
function renderTasks() {
    listTask.innerHTML = ''
    tasks.forEach(task => {
        if (
            task.title
                .toLowerCase()
                .includes(searchInput.value.toLowerCase()) ||
            task.desc.toLowerCase().includes(searchInput.value.toLowerCase())
        ) {
            const itemTask = document.createElement('div')
            itemTask.classList.add('item-task')

            const checkBtn = document.createElement('div')
            checkBtn.classList.add('check-btn')

            // Add checkmark SVG (replace with your actual SVG code)
            const checkmarkSvg = document.createElement('svg')
            checkmarkSvg.innerHTML = ` <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white" />
                <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L11 13.3656L9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z"
                        fill="#323232" />
                </svg>` // Replace with your checkmark SVG path
            checkBtn.appendChild(checkmarkSvg)

            const titleTask = document.createElement('div')
            titleTask.classList.add('title-task')
            titleTask.textContent = task.title

            const descTask = document.createElement('div')
            descTask.classList.add('desc-task')
            descTask.textContent = task.desc

            itemTask.appendChild(checkBtn)
            itemTask.appendChild(titleTask)
            itemTask.appendChild(descTask)

            checkBtn.addEventListener('click', () => {
                const confirmDelete = confirm(
                    'Are you sure you want to delete this task?'
                )
                if (confirmDelete) {
                    const taskIndex = tasks.indexOf(task)
                    tasks.splice(taskIndex, 1)
                    localStorage.setItem('tasks', JSON.stringify(tasks))
                    renderTasks()
                }
            })
            
            listTask.appendChild(itemTask)
        }
    })
}
searchInput.addEventListener('input', () => {
    console.error('first')
    renderTasks()
})

// Add a new task
function addTask() {
    const title = titleForm.value.trim()
    const desc = descForm.value.trim()

    if (title !== '') {
        const newTask = {
            id: Date.now(), // Generate unique ID
            title: title,
            desc: desc,
            completed: false
        }
        tasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks()
        titleForm.value = ''
        descForm.value = ''
        modalAdd.classList.remove('show')
    }
}

// Show the add task modal
addBtn.addEventListener('click', () => {
    modalAdd.classList.add('show')
})

// Cancel adding a task
cancelBtn.addEventListener('click', () => {
    modalAdd.classList.remove('show')
})

// Save a new task
saveBtn.addEventListener('click', addTask)
