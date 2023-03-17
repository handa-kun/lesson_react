import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppDispatch } from '../redux/hooks/redux';
import { deleteItem, toggleItem } from '../redux/slices/todoSlice';
import { TodoItemProps } from './interfaces/TodoItem';

const TodoItem: FC<TodoItemProps> = ({ serial, todo }) => {
    const dispatch = useAppDispatch();

    return (
        <Flex rounded={'xl'} border={'1px dashed'} borderColor={'blue.300'} gap={5} p={3}>
            <Checkbox
                isChecked={todo.completed}
                onChange={() => dispatch(toggleItem(todo.id))} />
            <Text as={todo.completed ? 'del' : 'p'} alignSelf={'center'}>
                <Text as='span' color={'blackAlpha.300'}>{serial}:</Text>
                {todo.title}
            </Text>
            <IconButton
                variant='outline'
                colorScheme='teal'
                aria-label='delete'
                fontSize='20px'
                ml={'auto'}
                icon={<DeleteIcon />}
                onClick={() => dispatch(deleteItem(todo.id))}
            />
        </Flex>
    );
};

export default TodoItem;