import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { selectAuth, selectProfile } from '../../utils/selectors';
import { useEffect, useRef, useState } from 'react';
import { editProfile, fetchOrUpdateProfile } from '../../features/profile';

const Profile = () => {
  /* Get the auth key in the store */
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();

  const firstNameField = useRef(null);
  const lastNameField = useRef(null);

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');

  const [editingName, setEditingName] = useState(false);

  /**
   * Validate the form and dispatch the edit profile action.
   * @function submitForm
   */
  const submitForm = () => {
    if (firstNameValue !== '' && lastNameValue !== '') {
      const newData = {
        firstName: firstNameValue,
        lastName: lastNameValue,
      };

      dispatch(editProfile(auth.data?.body.token, newData));
    }
    setEditingName(false);
  };

  /* Dispatch fetch action to get the profile data in the sotre */
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
              <input
                ref={firstNameField}
                onChange={() => {
                  const value = firstNameField.current.value;
                  setFirstNameValue(value);
                }}
                type="text"
                className="first-name-input"
                placeholder={firstName}
              />
              <input
                ref={lastNameField}
                onChange={() => {
                  const value = lastNameField.current.value;
                  setLastNameValue(value);
                }}
                type="text"
                className="last-name-input"
                placeholder={lastName}
              />
            </div>
            <div className="edit-section__buttons">
              <button onClick={submitForm} className="save-button">
                Save
              </button>
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
