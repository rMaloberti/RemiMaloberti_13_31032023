import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { selectAuth, selectProfile } from '../../utils/selectors';
import { useEffect, useState } from 'react';
import { fetchOrUpdateProfile } from '../../features/profile';

const Profile = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    dispatch(fetchOrUpdateProfile(auth.data?.body.token));
  }, [auth, dispatch]);

  const profileData = useSelector(selectProfile).data?.body ?? {};

  const { firstName, lastName } = profileData;

  return (
    <main className="main bg-dark">
      <div className="header">
        {editingName ? (
          <h1>Welcome back</h1>
        ) : (
          <h1>
            Welcome back
            <br />
            {`${firstName} ${lastName}!`}
          </h1>
        )}

        {editingName ? (
          <div className="edit-section">
            <div className="edit-section__textfields">
              <input type="text" className="first-name-input" placeholder={firstName} />
              <input type="text" className="last-name-input" placeholder={lastName} />
            </div>
            <div className="edit-section__buttons">
              <button className="save-button">Save</button>
              <button onClick={() => setEditingName(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditingName(true)} className="edit-button">
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
