import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

const router = express.Router();

let mdb = {};
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);
  mdb = db;
});

router.get('/contests', (req, res) => {
  let contests = {};
  mdb.collection('contests').find({})
    .each((err, contest) => {
      assert.equal(null, err);
      if (!contest) {
        res.send({ contests });
        return;
      }

      contests[contest.id] = contest;
    });
});

router.get('/names/:nameIds', (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(Number);
  let names = {};
  mdb.collection('names').find({ id: { $in: nameIds }})
    .each((err, name) => {
      assert.equal(null, err);
      if (!name) {
        res.send({ names });
        return;
      }

      names[name.id] = name;
    });
});

router.get('/contests/:contestId', (req, res) => {
  mdb.collection('contests')
    .findOne(({ id: +req.params.contestId }))
    .then(contest => res.send(contest))
    .catch(err => console.error(err));
});

export default router;
