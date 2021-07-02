import gravatar from '../../utils/gravatar';

test('Gravatar Function Test', () => {
  const email = 'geaglts@gmail.com';
  const gravatarUrl =
    'https://gravatar.com/avatar/410ab12974673dc3da5a69cc0a319042';
  expect(gravatarUrl).toEqual(gravatar(email));
});
