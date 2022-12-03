
import { AddIcon } from "@chakra-ui/icons"
import { Button, Flex, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TodoApi } from "../api/todoApi"
import { Todo } from "../types/Todo"
import TodoItem from "./TodoItem"

const TodoList = () => {
    const [ todos, setTodos ] = useState([] as Todo[])
    const [ newTodo, setNewTodo ] = useState("")

    const loadData = () => {
        TodoApi.getTodos()
            .then((response) => {
                console.log(response.data)
                setTodos(response.data.map((item) => ({
                    ...item,
                    isDeleted: false
                })))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deleteItem = (i: number) => {
        setTodos(todos.map((item, idx) => ({
            ...item,
            isDeleted: idx == i ? true : item.isDeleted
        })))
    }

    const addItem = (value: string) => {
        setTodos([
            ...todos,
            {
                userId: 1,
                title: value,
                completed: false,
                isDeleted: false
            }
        ])
    }

    /*useEffect(() => {
        loadData()
    }, [])*/

    return (
        <Flex flexDirection={'column'} gap={5}>
            <FormControl>
                <InputGroup> 
                    <Input 
                        placeholder={"Your dos"} 
                        value={newTodo}
                        onChange={(event) => {
                            setNewTodo(event.target.value)
                        }} 

                    />
                    <InputRightElement >
                        <Button 
                            variant={"ghost"}
                            onClick={() => {
                                addItem(newTodo)
                                setNewTodo("")
                            }}
                        >
                            <AddIcon />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            {
                todos.map((item, idx) => {
                    return <TodoItem todo={item} serial={idx + 1} key={idx} deleteItem={() => deleteItem(idx)}/>
                })
            }


        </Flex>
    )
}

export default TodoList