import { useEffect, useState } from "react";

const url =
  "https://api.mapbox.com/search/searchbox/v1/list/category?access_token=pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg&language=en";

// sweet cache bruh
let categories: { [key: string]: any }[] = [];

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categories.length) return;
    setIsLoading(true);
    const fetchCategories = async () => {
      const response = await fetch(url);
      const data = await response.json();
      categories = data.listItems;

      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return { isLoading, categories };
};
