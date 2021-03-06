import * as actionTypes from './actionTypes';
import axios from 'axios';
import {push} from 'connected-react-router';

export const getTodos_ = (todos) => {
  return {type: actionTypes.GET_ALL, todos:todos};
};

export const getTodos = () => {
   return dispatch => {
    return axios.get('/api/todo/')
      .then(res => dispatch(getTodos_(res.data)));
   }
};

export const deleteTodo_ = (id) => {
  return {
    type: actionTypes.DELETE_TODO,
    targetID: id
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/todo/${id}/`)
      .then(res => {
        dispatch(deleteTodo_(id));
      });
  };
};

export const toggleTodo_ = (id) => {
  return {
    type: actionTypes.TOGGLE_DONE,
    targetID: id
  };
};

export const toggleTodo = (id) => {
  return (dispatch) => {
    return axios.put(`/api/todo/${id}/`)
      .then(res => {
        dispatch(toggleTodo_(id));
      });
  };
};

export const postTodo_ = (td) => {
  return {
    type: actionTypes.ADD_TODO,
    id: td.id,
    title: td.title,
    content: td.content
  };
};

export const postTodo = (td) => {
  return (dispatch) => {
    // dispatch(startPostTodo);
   return axios.post('/api/todo/', td) 
      // .then(res => {
      //   dispatch(postTodo_(res.data));
      // });

      .then(res => { 
        dispatch(postTodo_(res.data));
        dispatch(push('/todos/'));
      // .then(() => { dispatch(push('/todos'))
        // dispatch(successPostTodo(res.data));
      });
      // .catch(err => {
      //   // dispatch(failurePostTodo(err));
      // });
    };
};

export const getTodo_ = (todo) => {
  return {
    type: actionTypes.GET_TODO,
    // title: todo.title,
    // content: todo.content,
    target: todo
  };
};

export const getTodo = (id) => {
  return (dispatch) => {
    return axios.get(`/api/todo/${id}/`)
      .then(res => {
        dispatch(getTodo_(res.data));
      });
  };
};
