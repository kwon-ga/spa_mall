const express = require('express');
const router = express.Router();
const Todo = require('../schemas/todo');

router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
  const todo = new Todo({ value, order });
  await todo.save();
  res.send({ todo });
});

router.get('/todos', async (req, res) => {
  const todos = await Todo.find({}).sort('-order').exec();
  res.send({ todos })
})

router.patch('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const { order, done, value } = req.body;

  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    throw new Error("존재하지 않는 todo 데이터입니다.");
  }

  if (order) {
    // 상/하 이동
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order;

  } else if (value) {
    // 텍스트 수정
    currentTodo.value = value;
  } else if (done !== undefined) {
    currentTodo.doneAt = done ? new Date() : null;
  }

  await currentTodo.save();
  res.send({ 'msg': '정상' });
})

router.delete('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const result = await Todo.deleteOne(
    { '_id': todoId }
  ).exec();
  res.send({ result });
})


module.exports = router;
