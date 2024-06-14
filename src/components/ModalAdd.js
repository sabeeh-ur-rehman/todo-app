import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const tagColors = {
  work: "bg-[#D2CEFF]",
  family: "bg-[#DAF2D6]",
  entertainment: "bg-[#F6CECE]",
  study: "bg-[#D1E5F7]",
};

const ModalAdd = ({
  open,
  handleClose,
  handleSubmit,
  inputValue,
  handleTitle,
  descriptionValue,
  handleDescription,
  selectedTag,
  handleTagClick,
  isEditing,
}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [tagError, setTagError] = useState("");

  const validate = () => {
    let isValid = true;
    if (!inputValue.trim()) {
      setTitleError("Please add a title");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!descriptionValue.trim()) {
      setDescriptionError("Please add a description");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!selectedTag) {
      setTagError("Please select a tag");
      isValid = false;
    } else {
      setTagError("");
    }

    return isValid;
  };

  const handleSubmitWithValidation = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit();
    }
  };

  const handleTitleChange = (e) => {
    handleTitle(e);
    if (titleError) {
      setTitleError("");
    }
  };

  const handleDescriptionChange = (e) => {
    handleDescription(e);
    if (descriptionError) {
      setDescriptionError("");
    }
  };

  const handleTagSelection = (tag) => {
    handleTagClick(tag);
    if (tagError) {
      setTagError("");
    }
  };

  const handleCloseWithReset = () => {
    setTitleError("");
    setDescriptionError("");
    setTagError("");
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMdUp ? "50%" : "100%",
    height: isMdUp ? "auto" : "100%",
    bgcolor: "background.paper",
    p: isMdUp ? 6 : 2,
    borderRadius: isMdUp ? "10px" : "0px",
    outline: "none",
    overflowY: "auto",
  };

  return (
    <Modal open={open} onClose={handleCloseWithReset}>
      <Box sx={style}>
        <div className="flex justify-between">
          <button
            onClick={handleCloseWithReset}
            className="text-sm text-[#69665C] font-bold"
          >
            Cancel
          </button>
          <form className="m-4 max-md:m-0" onSubmit={handleSubmitWithValidation}>
            <button className="bg-[#69665C] py-1 text-white px-6 rounded-md border-2">
              {isEditing ? "Update" : "Add"}
            </button>
          </form>
        </div>
        <p className="text-[#69665C] py-4 font-bold">Title*</p>
        <input
          className={`p-2 border rounded-md outline-none bg-[#F9F9F8] w-full ${titleError ? "border-red-500" : ""}`}
          type="text"
          maxLength={50}
          value={inputValue}
          onChange={handleTitleChange}
          placeholder="add a title"
        />
        {titleError && <p className="text-red-500 text-[10px] py-1">{titleError}</p>}
        <p className="text-[#69665C] py-4 font-bold">Description</p>
        <textarea
          className={`p-2 border rounded-md max-h-40 min-h-20 pt-2 w-full outline-none bg-[#F9F9F8] ${descriptionError ? "border-red-500" : ""}`}
          type="text"
          maxLength={500}
          value={descriptionValue}
          onChange={handleDescriptionChange}
          placeholder="add a description"
        />
        {descriptionError && <p className="text-red-500 text-[10px]">{descriptionError}</p>}
        <p className="text-[#69665C] py-4 font-bold">Tags</p>
        <div className="flex flex-wrap gap-2 max-md:gap-4">
          {Object.keys(tagColors).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagSelection(tag)}
              className={`${
                selectedTag === tag
                  ? "border border-[#69665C]"
                  : "border border-transparent text-[#69665c]"
              } ${tagColors[tag]} rounded-full p-2 text-xs font-bold ${tagError && !selectedTag ? "border-red-500" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
        {tagError && <p className="text-red-500 text-[10px] py-1">{tagError}</p>}
      </Box>
    </Modal>
  );
};

export default ModalAdd;
