import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Header from "./Header";

export const Dashboard = () => {
  // state to hold the list of category
  const [categories, setCategories] = useState(() => {
    // Retrieve categories from local storage on initial  load
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  //   state to hold the new category input value
  const [newCategory, setNewCategory] = useState("");
  // state to hold the new widget input value
  const [newWidget, setNewWidget] = useState({
    name: "",
  });
  //   state to track which category is selected for adding widgets
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Save categories to local storage whenever they change

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: Date.now(), name: newCategory, widgets: [] },
      ]);
      setNewCategory(""); // clear the input field
    }
  };

  const deleteCategory = (categoryId) => {
    let newCopyCategory = [...categories];
    newCopyCategory.splice(categoryId, 1);
    setCategories(newCopyCategory);
  };

  const addWidget = () => {
    if (newWidget.name.trim() && selectedCategoryId) {
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategoryId
          ? {
              ...category,
              widgets: [
                ...category.widgets,
                {
                  id: Date.now(),
                  name: newWidget.name,
                },
              ],
            }
          : category
      );
      setCategories(updatedCategories);
      setNewWidget({ name: "", content: "" }); // Clear the widget input fields
    }
  };

  const deleteWidget = (categoryId, widgetId) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? {
            ...category,
            widgets: category.widgets.filter(
              (widget) => widget.id !== widgetId
            ),
          }
        : category
    );
    setCategories(updatedCategories);
  };

  return (
    <div className="w-full h-full">
      <Header />
      <div className="p-10">
        <h1 className="text-2xl">Category</h1>
        <form
          className="mt-5 flex justify-between space-x-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-x-5">
            <input
              type="text"
              placeholder="add category"
              id="category"
              className="border-2 border-black pl-2 w-56 py-1.5 outline-none rounded-sm"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              onClick={handleCategory}
              className="border-2 border-black px-3.5 py-1.5 font-bold rounded-sm bg-gradient-to-r from-slate-500 to-white"
            >
              Add Category +
            </button>
            <select
              className=" py-1.5 px-3 border-2 border-black outline-none"
              value={selectedCategoryId || ""}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-x-5 ">
            <input
              type="text"
              placeholder="add widget title"
              className="border-2 border-black pl-2 outline-none rounded-sm py-1.5 px-3"
              value={newWidget.name}
              onChange={(e) =>
                setNewWidget({
                  ...newWidget,
                  id: Date.now(),
                  name: e.target.value,
                })
              }
            />
            <button
              onClick={addWidget}
              className="border border-black px-5 py-1.5 font-bold rounded-sm bg-gradient-to-r from-slate-500 to-white"
            >
              Add Widget +
            </button>
          </div>
        </form>

        {categories.map((category, id) => (
          <div key={id} className="w-[100%] mx-auto py-5  mt-10 ">
            <div className="w-full flex justify-between items-center px-5 ">
              <h2 className="text-black  capitalize text-2xl font-bold">
                {category.name + " Dashboard"}
              </h2>
              <button
                className="bg-red-400 text-white px-2 py-1.5 rounded-md"
                onClick={() => deleteCategory(id)}
              >
                Delete Category
              </button>
            </div>

            {/* display widgets within the category */}
            <div className="w-full  mt-3   py-5 pl-10  flex flex-wrap gap-10 ">
              {category.widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="w-3/12 h-[28vh] bg-white/40 rounded-md relative "
                >
                  <div className="w-full flex justify-between  items-center px-5 py-2 ">
                    <h4>{widget.name}</h4>
                    <RxCross2
                      className="cursor-pointer "
                      onClick={() => deleteWidget(category.id, widget.id)}
                    />
                  </div>
                  <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    no content available
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap ml-10"></div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
};
