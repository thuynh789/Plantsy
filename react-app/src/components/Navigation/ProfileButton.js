import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreatePlantModal from "../Plants/CreatePlant";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="user-button" onClick={openMenu}>
        <i className="fas fa-user-circle fa-2x" />
        <i class="fas fa-caret-down fa-lg arrow-down"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-menu-items">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li className ="li-button">

							<OpenModalButton
                className="create-plant-button"
								buttonText="Create a new plant"
								onItemClick={closeMenu}
								modalComponent={<CreatePlantModal/>}
							/>

						</li>
            {/* <li> */}
              <li  className="log-out-button" onClick={handleLogout}>Log Out</li>
            {/* </li> */}
          </div>
        ) : (
          <div className="modal-menu-items">
            <OpenModalButton
              buttonText="Sign In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Register"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
