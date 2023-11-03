import TaskType from "src/components/TaskType/TaskType";

const TaskBox = ({tasks}) => {
    return (
        <div>
            {tasks.map(({type, data}) => {
                return (
                   <TaskType type={type} data={data}/>
                )
            })}
        </div>
    )
}

export default TaskBox
