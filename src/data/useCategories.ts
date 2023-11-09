import { useEffect, useState } from "react";

const url =
  "https://api.mapbox.com/search/searchbox/v1/list/category?access_token=pk.eyJ1IjoicGJyZWpjaGEiLCJhIjoiY2xvbjVnMzEzMTVtdDJxczJ0eHYzNzJuaSJ9.2tYGp8sOaY8gVdaG5yr9zg&language=en";

// sweet cache bruh
const categories = [
  { canonical_id: "monument" },
  { canonical_id: "shopping" },
  { canonical_id: "restaurant" },
  { canonical_id: "food_and_drink" },
  { canonical_id: "bar" },
  { canonical_id: "hotel" },
];

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categories.length) return;
    setIsLoading(true);
    const fetchCategories = async () => {
      const response = await fetch(url);
      const data = await response.json();
      // categories = data.listItems;

      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return { isLoading, categories };
};
