import { AddIcon } from "@chakra-ui/icons"
import { Button, Flex, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TodoApi } from "../api/todoApi"
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux'
import { addItem } from '../redux/slices/todoSlice'
import TodoItem from './TodoItem'

const TodoList = () => {
    const [text, setText] = useState<string>('');

    const todos = useAppSelector(state => state.todoReducer.todos);
    const dispatch = useAppDispatch();

    const addTask = () => {
        dispatch(addItem(text));
        setText('')
    };

    /*   useEffect(() => {
          if (todos.length == 0) {
              loadData()
          }
      }, []);
  
      const loadData = () => {
          TodoApi.getTodos()
              .then((response) => {
                  setTodos(response.data.map((item: any) => ({
                      ...item,
                      isDeleted: false
                  })))
              })
              .catch((err) => {
                  err === 'Error';
              })
      };
  
     */
    return (
        <Flex flexDirection={'column'} gap={5}>
            <FormControl>
                <InputGroup>
                    <Input
                        placeholder={"Your dos"}
                        value={text}
                        onChange={(event) => {
                            setText(event.target.value)
                        }}
                    />
                    <InputRightElement >
                        <Button
                            variant={"ghost"}
                            onClick={() => addTask()}
                        >
                            <AddIcon />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {todos.map((item, idx) => <TodoItem serial={idx + 1} key={item.id} todo={item} />)}
        </Flex>
    )
};

export default TodoList;