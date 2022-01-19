const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThought } = require('./data');

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

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');


    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];

    const thoughts = [];

    for (let i = 0; i < 10; i++) {
        let username = usernames[i];
        const email = username + '@gmail.com';

        users.push({
            username,
            email,
        });
    }
    for (let i = 0; i < 10; i++) {
        const thoughtText = getRandomThought();
        let username = getRandomUser();

        thoughts.push({
            thoughtText,
            username,
        });
    }

    await User.collection.insertMany(users);

    await Thought.collection.insertMany(thoughts);


    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});

