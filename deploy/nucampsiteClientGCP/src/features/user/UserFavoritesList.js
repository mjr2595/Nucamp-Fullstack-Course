import { Link } from 'react-router-dom';
import {
    selectCurrentUserFavorites,
    deleteFavorite,
    isAuthenticated
} from '../user/userSlice';
import { selectCampsiteById } from '../campsites/campsitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button } from 'reactstrap';

const RenderFavoriteCampsite = ({ campsiteId }) => {
    const campsite = useSelector(selectCampsiteById(campsiteId));
    const { image, name, _id } = campsite;
    const dispatch = useDispatch();

    return (
        <>
            <Col md='1' className='align-self-center'>
                <Button
                    outline
                    color='danger'
                    onClick={() => dispatch(deleteFavorite(_id))}
                >
                    <i className='fa fa-times' />
                </Button>
            </Col>
            <Col>
                <Link to={`/directory/${_id}`}>
                    <img src={image} alt={name} style={{ width: '150px' }} />
                    <p className='fw-bold'>{name}</p>
                </Link>
            </Col>
        </>
    );
};

const UserFavoritesList = () => {
    const auth = useSelector(isAuthenticated);
    const favorites = useSelector(selectCurrentUserFavorites);

    if (!auth) {
        return (
            <Col>
                <p>You must be logged in to view favorites.</p>
            </Col>
        );
    }

    if (favorites.length === 0) {
        return (
            <Col>
                <p>You have no favorites selected.</p>
            </Col>
        );
    }
    return (
        <>
            {favorites.map((favorite) => {
                return (
                    <div className='d-flex' key={favorite.campsiteId}>
                        <RenderFavoriteCampsite campsiteId={favorite.campsiteId} />
                    </div>
                );
            })}
        </>
    );
};

export default UserFavoritesList;
