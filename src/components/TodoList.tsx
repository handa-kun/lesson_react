import { AddIcon } from "@chakra-ui/icons"
import { Button, Flex, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TodoApi } from "../api/todoApi"
import { Todo } from "../types/Todo"
import TodoItem from './TodoItem'


const TodoList = () => {
    const [todos, setTodos] = useState([] as Todo[])
    const [newTodo, setNewTodo] = useState("")

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
        TodoApi.deleteTodos(i + 1)
    }

    const addItem = (todo: Todo) => {
        setTodos([
            ...todos,
            todo
        ])
    }

    useEffect(() => {
        if (todos.length == 0) {
            loadData()
        }
    }, [])

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
                                const newTodoItem: Todo = {
                                    userId: 1,
                                    title: newTodo,
                                    completed: false,
                                    isDeleted: false
                                }
                                TodoApi.addTodos(newTodoItem)
                                addItem(newTodoItem)
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
                    return <TodoItem todo={item} serial={idx + 1} key={idx} deleteItem={() => deleteItem(idx)} />
                })
            }
        </Flex>
    )
}

export default TodoList