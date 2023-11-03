import TaskType from "src/components/TaskType/TaskType";

const TaskBox = ({tasks}) => {
    return (
        <>
          {tasks.map(({type, data}) => {
              return (
                 <TaskType type={type} data={data} />
              )
          })}
        </>
    )
}

export default TaskBox
