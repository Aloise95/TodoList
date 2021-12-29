import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:5000"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/todos"
    )
    return todos
  } catch (err) {
    throw err
  }
}

export const addTodo = async (
    formData: ITodo
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
        type TodoPreview = Omit<ITodo, "_id">;

      const todo: TodoPreview = {
          name: formData.name,
          description: formData.description,
          status: false
      }
      const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/add-todo",
        todo
      )
      return saveTodo
    } catch (err) {
      throw err
    }
  }


export const updateTodo = async (
    todo: ITodo
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todoUpdate: Pick<ITodo, "status"> = {
        status: true,
      }
      const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/todo-edit/${todo._id}`,
        todoUpdate
      )
      return updatedTodo
    } catch (err) {
      throw err
    }
  }
  export const deleteTodo = async (
    _id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-todo/${_id}`
      )
      return deletedTodo
    } catch (err) {
      throw err
    }
  }