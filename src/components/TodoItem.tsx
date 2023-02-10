import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { number } from 'yup';
import { TodoApi } from '../api/todoApi';
import { Todo } from '../types/Todo';
import TodoList from './TodoList';

interface TodoItemProps {
    serial: number
    deleteItem: any
    todo: Todo
}

const TodoItem: FC<TodoItemProps> = (props) => {
    const [complete, setComplete] = useState(props.todo.completed);

    if (props.todo.isDeleted) {
        return <></>
    };

    return (
        <Flex rounded={'xl'} border={'1px dashed'} borderColor={'blue.300'} gap={5} p={3}>
            <Checkbox
                isChecked={complete}
                onChange={() => { setComplete(!complete) }} />
            <Text as={complete ? 'del' : 'p'} alignSelf={'center'}>
                <Text as='span' color={'blackAlpha.300'}>{props.serial}. </Text>
                {props.todo.title}
            </Text>
            <IconButton
                variant='outline'
                colorScheme='teal'
                aria-label='delete'
                fontSize='20px'
                ml={'auto'}
                icon={<DeleteIcon />}
                onClick={props.deleteItem}
            />
        </Flex>
    )
}


export default TodoItem;