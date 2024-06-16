import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

const tagColors = {
  work: "bg-[#D2CEFF]",
  family: "bg-[#DAF2D6]",
  entertainment: "bg-[#F6CECE]",
  study: "bg-[#D1E5F7]",
};

const Body = () => {
  const dispatch = useDispatch();
  const { todos, filterTag, hideDone } = useSelector((state) => state.todos);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    dispatch({ type: "SET_TODOS", payload: newTodos });
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    dispatch({ type: "SET_TODOS", payload: newTodos });
    toast.error("Todo Deleted Successsfully");
    if (dropdownIndex === index) {
      setDropdownIndex(null);
    } else if (dropdownIndex > index) {
      setDropdownIndex(dropdownIndex - 1);
    }
  };

  const handleEdit = (index) => {
    const todo = todos[index];
    dispatch({ type: "SET_INPUT_VALUE", payload: todo.title });
    dispatch({ type: "SET_DESCRIPTION_VALUE", payload: todo.description });
    dispatch({ type: "SET_SELECTED_TAG", payload: todo.tags[0] || "" });
    dispatch({ type: "SET_EDITING_INDEX", payload: index });
    dispatch({ type: "SET_OPEN", payload: true });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterTag && !todo.tags.includes(filterTag)) {
      return false;
    }
    if (hideDone && todo.done) {
      return false;
    }
    return true;
  });

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current[dropdownIndex] &&
      !dropdownRefs.current[dropdownIndex].contains(event.target)
    ) {
      setDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownIndex]);

  return (
    <div className="max-md:m-2 p-2 px-8 w-full">
      <ul className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        {filteredTodos.map((todo, index) => (
          <li
            className="bg-[#FDF9DE] gap-7 max-md:w-auto rounded-md p-4 my-2 flex flex-col justify-between"
            key={index}
          >
            <div>
              <div className="flex justify-between items-center">
                <h2
                  className={`font-semibold text-[#69665c] break-words ${
                    todo.done ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </h2>
                <div className="relative" ref={(el) => (dropdownRefs.current[index] = el)}>
                  <svg
                    className="w-4 fill-[#69665c] cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    onClick={() => toggleDropdown(index)}
                  >
                    <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                  </svg>
                  {dropdownIndex === index && (
                    <ul className="absolute right-0 w-40 bg-white rounded-md shadow-lg py-2">
                      <li
                        onClick={() => handleEdit(index)}
                        className="cursor-pointer px-4 py-2 text-[#69665c] hover:bg-gray-100"
                      >
                        Edit
                      </li>
                      <li
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer px-4 py-2 text-[#69665c] hover:bg-gray-100"
                      >
                        Delete
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <p className={`text-[#69665c] break-words ${todo.done ? "line-through" : ""}`}>
                {todo.description}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap">
                {todo.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`${tagColors[tag.toLowerCase()]} rounded-full px-2 py-1 mr-2 text-xs`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-end">
                <input
                  type="checkbox"
                  className="m-2 accent-white cursor-pointer"
                  checked={todo.done}
                  onChange={() => handleDone(index)}
                />
                <label
                  onClick={() => handleDone(index)}
                  className="font-semibold text-[#69665c] cursor-pointer"
                >
                  Done
                </label>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Body;
