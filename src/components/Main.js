import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import ModalAdd from "./ModalAdd";
import TagsFilter from "./TagsFilter";
import toast from "react-hot-toast";

const Layout = () => {
  const dispatch = useDispatch();
  const {
    open,
    todos,
    inputValue,
    descriptionValue,
    selectedTag,
    filterTag,
    editingIndex,
    hideDone,
  } = useSelector((state) => state.todos);

  const handleOpen = () => dispatch({ type: "SET_OPEN", payload: true });
  const handleClose = () => {
    dispatch({ type: "SET_OPEN", payload: false });
    dispatch({ type: "SET_EDITING_INDEX", payload: null });
    dispatch({ type: "SET_INPUT_VALUE", payload: "" });
    dispatch({ type: "SET_DESCRIPTION_VALUE", payload: "" });
    dispatch({ type: "SET_SELECTED_TAG", payload: "" });
  };

  const handleTitle = (event) => {
    dispatch({ type: "SET_INPUT_VALUE", payload: event.target.value });
  };

  const handleDescription = (event) => {
    dispatch({ type: "SET_DESCRIPTION_VALUE", payload: event.target.value });
  };

  const handleTagClick = (tag) => {
    dispatch({
      type: "SET_SELECTED_TAG",
      payload: tag === selectedTag ? "" : tag,
    });
  };

  const handleTagSelect = (tag) => {
    dispatch({ type: "SET_FILTER_TAG", payload: tag === filterTag ? "" : tag });
  };

  const handleSubmit = () => {
    if (inputValue) {
    const newTodo = {
    title: inputValue.trim(),
    description: descriptionValue.trim(),
    tags: selectedTag ? [selectedTag] : [],
    done: false,
    };
    if (editingIndex !== null) {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = { ...updatedTodos[editingIndex], ...newTodo };
    dispatch({ type: 'SET_TODOS', payload: updatedTodos });
    toast.success("Todo Updated Successfully");
    } else {
    dispatch({ type: 'SET_TODOS', payload: [...todos, newTodo] });
    toast.success("Todo Added Successfully");
    }
    handleClose();
    }
    };

  const toggleHideDone = () => {
    dispatch({ type: "SET_HIDE_DONE" });
  };

  return (
    <>
      <Header handleOpen={handleOpen} />
      <div className="flex max-md:flex-col">
        <TagsFilter
          selectedTag={filterTag}
          handleTagSelect={handleTagSelect}
          toggleHideDone={toggleHideDone}
          hideDone={hideDone}
        />
        <Body
          todos={todos}
          selectedTag={filterTag}
          hideDone={hideDone}
        />
      </div>
      <ModalAdd
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        handleTitle={handleTitle}
        descriptionValue={descriptionValue}
        handleDescription={handleDescription}
        selectedTag={selectedTag}
        handleTagClick={handleTagClick}
        isEditing={editingIndex !== null}
      />
    </>
  );
};

export default Layout;
