const { User } = require('../../models');

const userData = [
  {
    email: 'kyle@email.com',
    password: 'password123',
    firstName: 'Kyle',
    lastName: "Et",
    role: 'tech'
  },
  {
    email: 'bliss@email.com',
    password: '123password',
    firstName: 'Kyle',
    lastName: 'Bliss',
    role: 'tech'
  },
  {
    email: 'adrian@email.com',
    password: 'password123',
    firstName: 'Adrian',
    lastName: 'Cheu',
    role: 'tech'
  },
  {
    email: 'james@email.com',
    password: '123password',
    firstName: 'James',
    lastName: 'Brain',
    role: 'tech'
  },
  {
    email: 'sofia@email.com',
    password: 'password123',
    firstName: 'Sofia',
    lastName: 'Teja',
    role: 'client'
  },
  {
    email: 'rachel@email.com',
    password: '123password',
    firstName: 'Rachel',
    lastName: 'Thi',
    role: 'client'
  },
  {
    email: 'vanna@email.com',
    password: '123abc',
    firstName: 'Vanna',
    lastName: 'Luci',
    role: 'client'
  }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers