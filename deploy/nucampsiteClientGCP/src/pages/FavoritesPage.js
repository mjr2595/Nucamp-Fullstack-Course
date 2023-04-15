import { Container, Row } from 'reactstrap';
import UserFavoritesList from '../features/user/UserFavoritesList';
import SubHeader from '../components/SubHeader';

const FavoritesPage = () => {
    return (
        <Container>
            <SubHeader current='Favorites' />
            <Row>
                <UserFavoritesList />
            </Row>
        </Container>
    );
};

export default FavoritesPage;
