import express from 'express';
import data from '../src/testData';

const router = express.Router();

const contests = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {});

router.get('/contests', (req, res) => {
  res.send({ contests });
});

router.get('/contests/:contestId', (req, res) => {
  let contest = contests[req.params.contestId];
  const data = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis augue sed massa luctus suscipit. Mauris porta fringilla justo, sit amet posuere nibh efficitur non. Aliquam sed ex vel mi porta pulvinar a vel eros. Maecenas sagittis felis vitae ante interdum suscipit pellentesque eu massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam volutpat velit sit amet ipsum lobortis, a maximus dui feugiat. Nulla tellus est, congue et est ac, dignissim egestas ipsum. Maecenas efficitur lorem id enim finibus fringilla.

  Aenean ultricies commodo sapien, malesuada condimentum lectus condimentum id. Quisque eget pulvinar ante. Mauris bibendum nisi eget sem finibus rutrum. Suspendisse dapibus ipsum quis quam sagittis, sed dictum nisl auctor. Cras dictum tortor id tellus laoreet fermentum. Suspendisse potenti. Sed faucibus dolor nibh, quis ultricies leo volutpat eu. Ut tempus ligula laoreet enim tristique, a volutpat est aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam dui dolor, luctus in iaculis eu, convallis ac massa.`;
  contest.description = data;

  res.send(contest);
});

export default router;
