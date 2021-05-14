/**
 * 1 Instalar md5 npm i md5
 */
import md5 from 'md5';

const gravatar = (email = 'geaglts@gmail.com') => {
  const baseUrl = 'https://gravatar.com/avatar/';
  const formattedEmail = email.trim().toLowerCase();
  const hashEmail = md5(formattedEmail);

  return `${baseUrl}${hashEmail}`;
};

export default gravatar;
