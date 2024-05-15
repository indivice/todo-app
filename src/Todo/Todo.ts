import { Layout, Content, Input } from '@indivice/omega/components'

//import the todo and State type
import type { Todo } from '../app'
import type { State } from '@indivice/omega'

//change the function to accept a todo and index
export default function Todo(todo: Todo, index: State<number>) {
    return Layout.Column({
        children: [
            Content.InlineTextBox({
                children: [
                    //use the $text directive to convert index value to text node
                    index.$text((i) => `#${i + 1}. `),
                    //show the todo title as recieved
                    Content.Text(todo.title)
                ]
            }),
            
            Content.TextBox({
                //show the todo body as recieved
                child: Content.Text(todo.body)
            }),
            
            Input.Button({
                child: Content.Text("Remove Todo")
            })
        ]
    })
}