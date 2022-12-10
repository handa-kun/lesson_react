import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { LoginRequest } from '../types/Auth'
import { loginValidation } from '../validation/login'

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {} as LoginRequest,
    validationSchema: loginValidation,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <Center h={'100vh'}>
      <Flex
        as='form'
        // @ts-ignore
        onSubmit={formik.handleSubmit}
        gap={4}
        flexDirection={'column'}
      >
        <FormControl
          isInvalid={formik.touched.email && Boolean(formik.errors.email)}
        >
          <FormLabel>Email</FormLabel>
          <Input
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
        >
          <FormLabel>Password</FormLabel>
          <Input
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button type='submit'>Login</Button>
      </Flex>
    </Center>
  )
}

export default LoginPage
