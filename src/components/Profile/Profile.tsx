import React from 'react';
import { useSelector } from 'react-redux';

import useStyles from './Profile.styles';
import { userSelector } from '../../features/auth';

const Profile = () => {
  const classes = useStyles();
  const { user } = useSelector(userSelector);

  return (
    <div className={classes.container}>
      Profile: {user.name} ({user.id})
    </div>
  );
};

export default Profile;
