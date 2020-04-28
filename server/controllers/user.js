'use strict';

const db = require('../models');

async function getAllUsers (req, res) {
  try {
    const userList = await db.User.findAll({});
    res.status(200);
    res.json(userList);
  } catch (error) {
    console.log(error); //eslint-disable-line
    res.sendStatus(500);
  }
}

async function getUser (req, res) {
  try {
    const user = await db.User.findOne({
      where: { userName: req.params.username }
    });
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      throw new Error('no user found');
    }
  } catch (error) {
    console.log(error); //eslint-disable-line
    if (error.message === 'no user found') {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
}

async function insertUser (req, res) {
  try {
    const addedUser = await db.User.create({ userName: req.body.userName });
    res.status(201);
    res.json(addedUser);
  } catch (error) {
    console.log(error); //eslint-disable-line
    res.sendStatus(500);
  }
}

async function deleteUser (req, res) {
  try {
    await db.User.destroy({
      where: {
        userName: req.body.userName
      },
    });
    res.status(200);
    res.json({ userName: req.body.userName });
  } catch (error) {
    console.log(error); //eslint-disable-line
    res.sendStatus(500);
  }
}

module.exports = {
  getAllUsers,
  insertUser,
  deleteUser,
  getUser
};