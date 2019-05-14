import { getTodos, toggleTodo, removeTodo, getIncompletedTodos } from './todos'
import { getFilters } from './filters'

// Display all todos in DOM
const renderTodos = () => {
    
    const todosEl = document.querySelector ( '.todos' )

    const todos = getTodos ()
    const { searchText, hideCompleted } = getFilters ()

    const filteredTodos = todos.filter ( ( todo ) => {

        const isTextMatch = todo.text.toLowerCase().includes ( searchText.toLowerCase() )
        const isHideCompletedMatch = !hideCompleted ? true : !todo.completed
        
        return isTextMatch && isHideCompletedMatch
    } )

    todosEl.innerHTML = ''

    if ( filteredTodos.length > 0 ) {

        todosEl.appendChild ( generateTodosSummary ( filteredTodos ) ) 

        let todoEl
        filteredTodos.forEach ( ( todo ) => {
            todoEl = generateTodoDOM ( todo )
            todosEl.appendChild ( todoEl )
        } )

    } else {

        const emptyMessage = document.createElement ( 'p' )
        emptyMessage.classList.add ( 'empty-message' )
        emptyMessage.textContent = 'No todos to show'
        todosEl.appendChild ( emptyMessage )
    }

}

// Generate todos summary message
const generateTodosSummary = () => {

    const count = getIncompletedTodos().length

    const plural = count === 1 ? 'todo' : 'todos'

    const paragraph = document.createElement ( 'p' )
    paragraph.classList.add ( 'list-title' )
    paragraph.textContent = `You have ${count} ${plural} left`

    return paragraph

}

// generate DOM for each todo
const generateTodoDOM = ( todo ) => {

    const todoEl = document.createElement ( 'label' )
    todoEl.classList.add ( 'list-item' )

    // Setup container element
    const containerEl = document.createElement ( 'div' )
    containerEl.classList.add ( 'list-item__container' )
    
    // Setup checkbox Element
    const checkboxEl = document.createElement ( 'input' )
    checkboxEl.setAttribute ( 'type', 'checkbox' )
    checkboxEl.checked = todo.completed
    
    checkboxEl.addEventListener ( 'change', ( event ) => {
        toggleTodo ( todo.id )
        renderTodos ()
    } )

    // Setup text Element
    const textEl = document.createElement ( 'span' )
    textEl.textContent = todo.text

    // Setup remove button element
    const buttonEl = document.createElement ( 'button' )
    buttonEl.classList.add ( 'button', 'button--text' )
    buttonEl.textContent = 'remove'
    buttonEl.addEventListener ( 'click', () => {
        removeTodo ( todo.id )
        renderTodos ()
    } )

    containerEl.appendChild ( checkboxEl )
    containerEl.appendChild ( textEl )
    todoEl.appendChild ( containerEl )
    todoEl.appendChild ( buttonEl )

    return todoEl

}

export { renderTodos }