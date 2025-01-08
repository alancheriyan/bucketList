import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firebase setup
import { ListView } from "./ListView";
import { Spin } from "antd"; // Import the Ant Design Spinner

export const MainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categorySnapshot = await getDocs(collection(db, "tblCategory"));
        const categories = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch todo list items
        const todoSnapshot = await getDocs(collection(db, "tblTodoList"));
        const todos = todoSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Transform data into desired format
        const formattedData = categories.map((category) => ({
          id: category.id,
          categoryName: category.categoryName,
          todoList: todos
            .filter((todo) => todo.categoryId === category.id)
            .map(({ id, description, isCompleted }) => ({
              id,
              description,
              isCompleted,
            })),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  

  return (
    <div className="listview">
      <ListView data={data} />
    </div>
  );
};
