export const validateCommentForm = (values) => {
    const errors = {};

    if (!values.rating) {
        errors.rating = 'Required';
    }

    return errors;
};
