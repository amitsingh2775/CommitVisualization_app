import { atom } from 'recoil';

export const userState = atom({
  key: 'userState', // Unique ID (with respect to other atoms/selectors)
  default: {
    isLogin: false,
    userEmail: '',
    token: '',
    displayName: '',
    avatar_url: '',
  }, // Default value (initial state)
});
