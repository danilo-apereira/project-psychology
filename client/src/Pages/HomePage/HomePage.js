import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomePage() {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser)
        return <Navigate to='/auth/signin' />

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default HomePage;
