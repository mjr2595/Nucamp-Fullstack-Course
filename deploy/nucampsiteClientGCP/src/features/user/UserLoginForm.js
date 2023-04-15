import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from './userSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateUserForm } from '../../utils/validateUserForm';

const UserLoginForm = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        dispatch(
            userLogin({
                username: values.username,
                password: values.password
            })
        );
        setLoginModalOpen(false);
    };

    return (
        <>
            <span className='navbar-text ml-auto'>
                <Button
                    outline
                    onClick={() => setLoginModalOpen(true)}
                    style={{
                        color: 'white',
                        border: '1px solid white',
                        margin: '5px'
                    }}
                >
                    <i className='fa fa-sign-in fa-lg' /> Login
                </Button>
            </span>
            <Modal isOpen={loginModalOpen}>
                <ModalHeader toggle={() => setLoginModalOpen(false)}>
                    Login
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        onSubmit={handleLogin}
                        validate={validateUserForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor='username'>Username</Label>
                                <Field
                                    id='username'
                                    name='username'
                                    placeholder='Username'
                                    className='form-control'
                                />
                                <ErrorMessage name='username'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Field
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    className='form-control'
                                />
                                <ErrorMessage name='password'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <Button type='submit' color='primary'>
                                Login
                            </Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default UserLoginForm;
