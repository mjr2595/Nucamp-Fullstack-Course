import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { selectCommentsByCampsiteId } from '../campsites/campsitesSlice';
import { isAuthenticated } from '../user/userSlice';

const CommentsList = ({ campsiteId }) => {
    const comments = useSelector(selectCommentsByCampsiteId(campsiteId));
    const auth = useSelector(isAuthenticated);

    let pageContent = <></>;
    if (comments && comments.length > 0) {
        pageContent = (
            <>
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return <Comment key={comment._id} comment={comment} />;
                })}
            </>
        );
    } else {
        pageContent = <div>There are no comments for this campsite yet.</div>;
    }

    return (
        <Col md='5' className='m-1'>
            {pageContent}
            {auth && <CommentForm campsiteId={campsiteId} />}
        </Col>
    );
};

export default CommentsList;
