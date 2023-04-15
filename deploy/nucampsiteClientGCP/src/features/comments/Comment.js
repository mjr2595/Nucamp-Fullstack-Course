import { formatDate } from '../../utils/formatDate';

const Comment = ({ comment }) => {
    const { text: commentText, rating, author, updatedAt } = comment;

    if (commentText === '') {
        return (
            <p>
                {rating}/5 stars -- {author.username}, {formatDate(updatedAt)}
            </p>
        );
    }

    return (
        <p>
            {commentText}
            <br />
            {rating}/5 stars -- {author.username}, {formatDate(updatedAt)}
        </p>
    );
}; 

export default Comment;
