import { createTodo, loadTodos } from './todos'
import { setFilters } from './filters'
import { renderTodos } from './views'

// Configure input for searching or filtering todos
document.querySelector ( '#search-text' ).addEventListener ( 'input', ( event ) => {
    setFilters ( {
        searchText: event.target.value
    } )
    renderTodos ()
} )

// Configure hide completed checkbox
document.querySelector ( '#hide-completed' ).addEventListener ( 'change', ( event ) => {
    setFilters ( {
        hideCompleted: event.target.checked
    } )
    renderTodos ()
} )

// Configure todo form
document.querySelector ( '#todo-form' ).addEventListener ( 'submit', ( event ) => {

    event.preventDefault()
    const text = event.target.elements.addTodo.value.trim()
    createTodo ( text )    
    renderTodos ()
    event.target.elements.addTodo.value = ''
    
} )

// Sync data across pages
window.addEventListener ( 'storage', ( event ) => {
    if ( event.key === 'todos' ) {
        loadTodos ()
        renderTodos ()
    }
} )

renderTodos ()