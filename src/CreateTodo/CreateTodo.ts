//importing the state type
import { State } from '@indivice/omega'
import { Layout, Input, Content } from '@indivice/omega/components'
//import the todo type to use it for state
import { Todo } from '../app'

export default function CreateTodo(todos: State<Todo[]>) {

    //use a store to "store" grouped or object values
    const inputValues = State.Store({
        title: "",
        body: ""
    })
    
    //event listener to add a new todo
    function addTodo() {
        const title = inputValues.title.get()
        const body = inputValues.body.get()
    
        if ( title == "" || body == "" ) {
            alert("Todo cannot be empty")
            return //short circuit logic
        }
    
        todos.update( prevTodo => [ ...prevTodo, { title, body } ] )
        //clear the inputs
        inputValues.update({
            title: () => "",
            body: () => ""
        })
    }
    
    function InputDataHandler(event: Event, targetState: State<string>) {
        event.preventDefault()
        targetState.set(
            (event.target as HTMLInputElement).value
        )
    }

    return Layout.Column({
        children: [
            Input.Text({ 
                placeholder: "Enter todo name",
                oninput(e) {
                    //handle the input events ( data from UI to state )
                    InputDataHandler(e, inputValues.title)
                },
                //bind the value ( data from state to UI )
                value: inputValues.title.$property((title) => title) 
            }),

            Input.TextArea({ 
                placeholder: "Enter todo body",
                oninput(e) {
                    //handle the input events ( data from UI to state )
                    InputDataHandler(e, inputValues.body)
                },
                //bind the value ( data from state to UI )
                value: inputValues.body.$property(body => body) 
            }),
            
            Input.Button({
                //add the event listener on click
                onclick: addTodo,
                child: Content.Text("Add Todo")
            })
        ]
    })
}
