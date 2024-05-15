import { Content, Layout } from '@indivice/omega/components'
import { State } from '@indivice/omega'
import CreateTodo from './CreateTodo/CreateTodo'
import Todo from './Todo/Todo'

//import the sample todos
import { todos as SampleTodos } from './todo.data'

export type Todo = {
    title: string,
    body: string
}

export default function App() {

    const todos = new State<Todo[]>([])
    
    //set them to todos for now
    todos.set( SampleTodos )

    return Layout.Column({
        style: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            viewTransitionName: 'henlo'
        },
        
        children: [
            Layout.Column({
                style: { width: "300px" },
                children: [
                    Content.TextBox({
                        child: Content.Text("Todo App")
                    }),
                    
                    CreateTodo(todos),
                    Content.HorizontalRule(),
                    
                    Layout.Column.$builder({
                        each: todos,
                        builder(todo, index) {
                            //pass those builder values
                            return Todo(
                                todo, index
                            )
                        }
                    })
                    
                ]
            })
        ]
    })
}