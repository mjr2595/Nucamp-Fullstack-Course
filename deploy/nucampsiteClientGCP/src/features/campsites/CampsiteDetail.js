import { Card, CardImg, CardText, CardBody, Col, Button } from 'reactstrap';
import {
    postFavorite,
    deleteFavorite,
    isAuthenticated,
    selectCurrentUserFavorites
} from '../user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const CampsiteDetail = ({ campsite }) => {
    const { image, name, description, _id } = campsite;
    const dispatch = useDispatch();
    const auth = useSelector(isAuthenticated);
    const favorites = useSelector(selectCurrentUserFavorites);
    const isFavorite = favorites.find(
        (favorite) => favorite.campsiteId === campsite._id
    );

    return (
        <Col md='5' className='m-1'>
            <Card>
                <CardImg top src={image} alt={name} />
                <CardBody>
                    <CardText>{description}</CardText>
                    {auth && (
                        <Button
                            outline
                            color='primary'
                            onClick={() =>
                                isFavorite
                                    ? dispatch(deleteFavorite(_id))
                                    : dispatch(postFavorite(_id))
                            }
                        >
                            {isFavorite ? (
                                <i className='fa fa-heart' />
                            ) : (
                                <i className='fa fa-heart-o' />
                            )}
                        </Button>
                    )}
                </CardBody>
            </Card>
        </Col>
    );
};

export default CampsiteDetail;
