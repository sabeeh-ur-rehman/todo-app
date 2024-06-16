import React from "react";
import { useSelector, useDispatch } from "react-redux";
import image from "../assets/Capture.jpg";

const tagColors = {
  work: "bg-[#D2CEFF]",
  family: "bg-[#DAF2D6]",
  entertainment: "bg-[#F6CECE]",
  study: "bg-[#D1E5F7]",
};

const TagsFilter = () => {
  const dispatch = useDispatch();
  const { filterTag, hideDone, todos } = useSelector((state) => state.todos);

  const handleTagSelect = (tag) => {
    dispatch({ type: "SET_FILTER_TAG", payload: filterTag === tag ? "" : tag });
  };

  const toggleHideDone = () => {
    if (todos.length > 0) {
      dispatch({ type: "SET_HIDE_DONE" });
    }
  };

  return (
    <div className="p-4 max-md:p-6 flex flex-col justify-between h-[calc(100vh-100px)] max-md:h-auto max-md:border-r-0 border-r">
      <div className="flex flex-col max-md:flex-row max-md:justify-between max-md:gap-0 gap-2">
        {Object.keys(tagColors).map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagSelect(tag)}
            className={`${
              tagColors[tag]
            } rounded-full text-[#69665c] p-2 text-xs max-md:text-[10px] font-bold outline-none ${
              filterTag === tag ? "ring-1 ring-offset-2 ring-[#69665C]" : ""
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div
        className={`flex gap-2 max-md:hidden justify-center ${
          todos.length === 0 ? "opacity-50" : ""
        }`}
      >
        <input
        className={`${todos.length=== 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
          type="checkbox"
          checked={hideDone}
          onChange={toggleHideDone}
          disabled={todos.length === 0}
        />
        <label
          className={`text-xs font-semibold text-[#69665c] ${todos.length=== 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={toggleHideDone}
        >
          Hide Done Tasks
        </label>
      </div>

      <div className="w-40 staticic max-md:mt-0">
        <img className="max-md:hidden block" src={image} alt="Monkey" />
      </div>
    </div>
  );
};

export default TagsFilter;
