const express = require("express");
const router = express.Router();

// simple store for counters
let counters = {
  get: { count: 0, lastReset: Date.now() },
  post: { count: 0, lastReset: Date.now() },
};

// helper to bump counter and auto-reset after 7s
function bumpCounter(name) {
  const now = Date.now();
  const entry = counters[name];
  if (now - entry.lastReset > 7000) {
    entry.count = 0;
    entry.lastReset = now;
  }
  entry.count++;
  return entry.count;
}

router.get("/get", async (req, res) => {
  const count = bumpCounter("get");
console.log('✅✅ get called', count);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  res.status(200).send({ 
    result: "GET Successful", 
    requestsInLast7s: count 
  });
});

router.post("/post", async (req, res) => {
  const count = bumpCounter("post");

  console.log('⭕⭕ POST Called', count);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  res.status(200).send({ 
    result: "POST Successful", 
    requestsInLast7s: count 
  });
});

module.exports = router;
