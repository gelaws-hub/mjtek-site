import { PencilEdit02Icon } from "@/components/icons/PencilEdit02Icon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface categoryBrand {
  categories: {
    id: number;
    category_name: string;
    editState: false;
  }[];
  subCategories: {
    id: number;
    sub_category_name: string;
    editState: false;
  }[];
  brands: {
    id: number;
    brand_name: string;
    editState: false;
  }[];
}

export default function ProductDetailCrud() {
  const [categoryBrand, setCategoryBrand] = useState<categoryBrand>();

  useEffect(() => {
    const fetchCategoryBrand = async () => {
      try {
        const categoryBrand = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/category-brand`,
        );
        const response = await categoryBrand.json();
        setCategoryBrand(response.data);
      } catch (error) {
        console.error(
          "Error fetching categories and brands information : ",
          error,
        );
      }
    };
    fetchCategoryBrand();
  }, []);

  const handleEditButton = (id: any) => {
    setCategoryBrand((prevState: any) => {
      return {
        ...prevState,
        categories: prevState.categories.map((category: any) =>
          category.id === id
            ? { ...category, editState: !category.editState }
            : category,
        ),
      };
    });
  };

  const handleOnChange = (id: any, newValue: string) => {
    setCategoryBrand((prevState: any) => {
      return {
        ...prevState,
        categories: prevState.categories.map((category: any) =>
          category.id === id
            ? { ...category, category_name: newValue }
            : category,
        ),
      };
    });
  };

  return (
    <div className="relative w-full rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h3 className="text-title-md font-semibold text-black dark:text-white">
        productDetailCrud
      </h3>
      <form>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left">No</th>
              <th className="text-left">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categoryBrand?.categories.map((category, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <input
                    className="appearance-none rounded bg-inherit outline-none scrollbar-none focus:ring-0"
                    key={category.id}
                    value={`${category.category_name}`}
                    readOnly={!category.editState}
                    onChange={(e) =>
                      handleOnChange(category.id, e.target.value)
                    }
                  ></input>
                </td>
                <td>
                  <Button
                    className="h-8 bg-blue-700 p-1"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditButton(category.id);
                    }}
                  >
                    {category.editState ? (
                      <p>Cancel</p>
                    ) : (
                      <PencilEdit02Icon className="text-white" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
