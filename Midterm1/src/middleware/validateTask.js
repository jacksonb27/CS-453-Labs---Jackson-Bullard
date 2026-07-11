export default function validateTask(req, res, next) {
  const { title, course, completed } = req.body;

  // checks for fields, and if bad, then send 400
  if (req.body.title == undefined || req.body.course == undefined || req.body.completed == undefined)
  {
      return res.sendStatus(400);
  }
  next();
}