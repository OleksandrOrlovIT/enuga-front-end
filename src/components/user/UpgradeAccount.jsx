import {useContext, useEffect} from "react";
import {AuthContext} from "../auth/AuthContext";
import {useNavigate} from "react-router-dom";
import api from "../auth/api";

function UpgradeAccount() {
    const { user, hasRole, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleUpgrade = async () => {
            if (!hasRole('ROLE_USER_WITH_SUBSCRIPTION')) {
                try {
                    await api.put(`/user/${user.id}/upgrade-account`);
                    logout();
                } catch (error) {
                    console.error('Error upgrading account:', error);
                }
            } else {
                navigate('/home');
            }
        };

        handleUpgrade();
    }, [user, hasRole, navigate, logout]);

    return null;
}

export default UpgradeAccount;