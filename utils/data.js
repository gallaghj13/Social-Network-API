const usernames = [
    'user1',
    'user2',
    'user3',
    'user4',
    'user5',
    'user6',
    'user7',
    'user8',
    'user9',
    'user10',
];

const thoughts = [
    'Thought 1',
    'Thought 2',
    'Thought 3',
    'Thought 4',
    'Thought 5',
    'Thought 6',
    'Thought 7',
    'Thought 8',
    'Thought 9',
    'Thought 10',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () =>
  `${getRandomArrItem(usernames)}`;

const getRandomThought = () =>
  `${getRandomArrItem(thoughts)}`;

module.exports = { getRandomThought, getRandomUser };