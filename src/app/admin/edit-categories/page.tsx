"use client"
import { approveCategory, getCategoriesForAdmin, unapproveCategory } from "./action";
import { useEffect, useState } from "react";
import { createCategory } from "./action";
import SnackBar from "@/app/components/SnackBar";
import Loading from "@/app/components/Loading";
import { BackButton } from "@/app/components/BackButton";

interface Category {
    id: number;
    name: string;
    isApprove: boolean;
}

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackBar, setSnackBar] = useState<{
        message: string;
        show: boolean;
        isError: boolean;
    }>({
        message: '',
        show: false,
        isError: false,
    });

    const closeSnackBar = () => {
        setTimeout(() => {
            setSnackBar({
                message: '',
                show: false,
                isError: false,
            });
        }, 3000)
    };


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const categories = await getCategoriesForAdmin();
        const data = categories.map((category: any) => ({
            id: category.id,
            name: category.name,
            isApprove: category.isApprove,
        }));
        setCategories(data);
        setLoading(false);
    };

    const addCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const categoryName = formData.get('category');
        const response = await createCategory(categoryName as string);
        if (!response) {
            setSnackBar({
                message: 'Can\'t Create Category',
                show: true,
                isError: true,
            });
            closeSnackBar();
            return;
        }
        setSnackBar({
            message: 'Category Created Successfully',
            show: true,
            isError: false,
        });
        closeSnackBar();
        form.reset();
        fetchData();
    };

    const toggleUnapprove = async (id: number) => {
        await unapproveCategory(id);
        fetchData();
    }

    const toggleApproval = async (id: number) => {
        await approveCategory(id);
        fetchData();
    };
    /*     const removeCategory = (id: number) => {
            console.log("Remove : " + id);
        }; */

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <SnackBar message={snackBar.message} show={snackBar.show} isError={snackBar.isError} />
            <h1 className="text-3xl font-light mb-8 text-gray-800 mt-11">Categories</h1>

            {/* Add new category */}
            <div className="mb-10">
                <div className="flex flex-col sm:flex-row gap-3">
                    <form onSubmit={addCategory}>
                        <input
                            type="text"
                            name="category"
                            placeholder="Enter new category name"
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="ml-0 sm:ml-10 mt-5 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
                        >
                            Add Category
                        </button>
                    </form>
                </div>
            </div>

            {/* Display categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Approved categories */}
                <div className="space-y-4">
                    <h2 className="text-xl font-light text-gray-700 mb-4">Approved Categories</h2>
                    <div className="space-y-3">
                        {categories.filter(c => c.isApprove).map(category => (
                            <div key={category.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                <span className="mb-3 sm:mb-0 text-gray-800">{category.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleUnapprove(category.id)}
                                        className="cursor-pointer px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-200"
                                    >
                                        Unapprove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="space-y-4">
                    <h2 className="text-xl font-light text-gray-700 mb-4">Pending Categories</h2>
                    <div className="space-y-3">
                        {categories.filter(c => !c.isApprove).map(category => (
                            <div key={category.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                <span className="mb-3 sm:mb-0 text-gray-800">{category.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleApproval(category.id)}
                                        className="cursor-pointer px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200"
                                    >
                                        Approve
                                    </button>
                                    {/* <button
                                        onClick={() => removeCategory(category.id)}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
                                    >
                                        Remove
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BackButton />
        </div>
    );
}