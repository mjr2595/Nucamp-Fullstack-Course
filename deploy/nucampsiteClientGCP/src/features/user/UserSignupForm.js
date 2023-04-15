import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSignup } from './userSlice';
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

const UserSignupForm = () => {
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSignup = (values) => {
        dispatch(
            userSignup({
                username: values.username,
                password: values.password
            })
        );
        setSignupModalOpen(false);
    };

    return (
        <>
            <span className='navbar-text ml-auto'>
                <Button
                    outline
                    onClick={() => setSignupModalOpen(true)}
                    style={{ color: 'white', border: '1px solid white' }}
                >
                    <i className='fa fa-user-plus fa-lg' /> Sign Up
                </Button>
            </span>
            <Modal isOpen={signupModalOpen}>
                <ModalHeader toggle={() => setSignupModalOpen(false)}>
                    Sign Up
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        onSubmit={handleSignup}
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
                                Sign Up
                            </Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default UserSignupForm;
