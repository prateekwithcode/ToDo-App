import Task from "../models/taskModel.js";

// CREATE A NEW TASK

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueData, completed } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      dueData,
      completed: completed == "yes" || completed == true,
      owner: req.user.id,
    });
    const saved = await task.save();
    res.status(200).json({ success: true, task: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL TASK FOR LOGGED - IN USER

export const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//GET SINGLE TASK BY ID (MUST BELONG TO THAT USER)

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//UPDATE TASK

export const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed = data.completed === "yes" || data.completed === "true";
    }

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Task not found or nt yours",
      });
    }

    res.json({ success: true, task: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//DELETE A TASK

export const deleteTask = async (req, res) => {
  try {
    const delted = await Task.findOneAndDelete({
      _id: req.param.id,
      owner: req.user.id,
    });

    if (!delted) {
      return res
        .status(404)
        .json({ status: false, message: "Task not found and not yours" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};
