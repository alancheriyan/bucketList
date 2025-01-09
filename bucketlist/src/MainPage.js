import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firebase setup
import { ListView } from "./ListView";
import { Spin } from "antd"; // Import the Ant Design Spinner

export const MainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories, ordered by CreatedAt
        const categoryQuery = query(
          collection(db, "tblCategory"),
          orderBy("createdAt", "asc") // Order categories by CreatedAt (ascending)
        );
        const categorySnapshot = await getDocs(categoryQuery);
        const categories = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch todo list items, ordered by CreatedAt
        const todoQuery = query(
          collection(db, "tblTodoList"),
          orderBy("createdAt", "asc") // Order todos by CreatedAt (ascending)
        );
        const todoSnapshot = await getDocs(todoQuery);
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
console.log(formattedData)
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
