"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";
import Loading from "../../components/Loading";
import { getCategories, getRegion } from "@/app/libs/action";
import { createPost } from "./action";

interface State {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  isApprove: boolean;
}

export default function PostEditor() {
  const [loading, setLoading] = useState(true);
  // State for form fields
  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  //
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [states, setStates] = useState<State[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchRegionsAndCatrgories = async () => {
      const regions = await getRegion();
      const categories = await getCategories();
      setStates(regions);
      setCategories(categories);
    };
    fetchRegionsAndCatrgories();
    setLoading(false);
  }, []);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "discover-myanmar"); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgotgr9jk/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = "ခေါင်းစဥ်ထည့်ရန်";
    }
    if (!content.trim()) {
      newErrors.content = "Content is required";
    }
    if (!region) {
      newErrors.state = "Please Choose State or Region";
    }
    if (!category) {
      newErrors.category = "Please Choose Category";
    }
    if (!imagePreview) {
      newErrors.image = "ပုံထည့်ရန်";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        setErrors((prev) => ({ ...prev, image: "Please select an image" }));
        return;
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(file);

      // Now submit all form data including the Cloudinary URL
      const formData = {
        title,
        image: imageUrl as string,
        content,
        region,
        category,
      };
      await createPost(formData);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
      setTitle("");
      setImagePreview(null);
      setContent("");
      setRegion("");
      setCategory("");
      setErrors({});
    }
  };

  if (loading) return <Loading skeletonStyle="write-post" />;
  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-xl  mb-8 text-gray-800 text-center">
        ဆောင်းပါးအသစ်ရေးရန်
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Input */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
            placeholder="Post Title"
            className={`w-full p-2 text-lg font-light border focus:outline-none ${errors.title
              ? "border-red-500"
              : "border-gray-200 focus:border-gray-400"
              }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Image Upload */}
        <div
          className={`border-3 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${errors.image
            ? "border-red-500"
            : "border-gray-200 hover:border-gray-400"
            }`}
          onClick={() => fileInputRef.current?.click()}>
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative w-full h-64">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-contain"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Click to upload an image
              </p>
            </div>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* ReactQuill Editor */}
        <div className="min-h-[200px]">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => {
              setContent(value);
              setErrors((prev) => ({ ...prev, content: "" }));
            }}
            placeholder="ဆောင်းပါးရေးရန်..."
            className={`h-64 ${errors.content ? "border-red-500" : ""}`}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* Dropdown Options */}
        <div className="flex flex-col md:flex-row gap-4 mt-20">
          <div className="flex-1">
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setErrors((prev) => ({ ...prev, state: "" }));
              }}
              className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${errors.state
                ? "border-red-500"
                : "border-gray-300 hover:border-gray-400"
                } bg-white`}>
              <option value="" disabled>
                တိုင်းနှင့်ပြည်နယ် ရွေးချယ်ပါ
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div className="flex-1">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setErrors((prev) => ({ ...prev, category: "" }));
              }}
              className={`w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${errors.category
                ? "border-red-500"
                : "border-gray-300 hover:border-gray-400"
                } bg-white`}>
              <option value="" disabled>
                အမျိုးအစား ရွေးချယ်ပါ
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className=" flex flex-col justify-between">
          <Link
            href={"/user/write-post/rules"}
            className=" underline decoration-solid text-red-600 mb-5">
            {" "}
            စည်းကမ်းချက်များ
          </Link>
          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-2 text-white font-light rounded-sm transition bg-gray-800 hover:bg-gray-700 cursor-pointer`}>
            {isSubmitting ? "posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
