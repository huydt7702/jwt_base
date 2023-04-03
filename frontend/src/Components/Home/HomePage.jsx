import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createAxios } from "../../createInstance";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";
import "./home.css";

const HomePage = () => {
    const [renderPage, setRenderPage] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);
    const msg = useSelector((state) => state.users?.msg);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDelete = (id) => {
        deleteUser(user?.accessToken, dispatch, id, axiosJWT);
        setRenderPage(!renderPage);
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderPage]);

    return (
        <main className="home-container">
            <div className="home-title">User List</div>
            <div className="home-role">{`Your role: ${user?.isAdmin ? "Admin" : "User"}`}</div>
            <div className="home-userlist">
                {userList?.map((user) => {
                    return (
                        <div key={user._id} className="user-container">
                            <div className="home-user">{user.username}</div>
                            <div className="delete-user" onClick={() => handleDelete(user._id)}>
                                Delete
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="errorMsg">{msg}</div>
        </main>
    );
};

export default HomePage;
