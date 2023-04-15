import defaultAvatar from '../../app/assets/img/unicorn.png';

const UserAvatar = () => {
    return (
        <div style={{ width: '4rem', height: '4rem' }}>
            <img
                src={defaultAvatar}
                alt={'user'}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default UserAvatar;
