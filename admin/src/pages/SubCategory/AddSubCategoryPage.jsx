import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import useFetch from "../../hooks/useFetch";
import Select from "../../components/Input/Select";

const AddSubCategoryPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const { postData, response, postError } = useCreate(apis.subCategory.create);
  const { errors, validate } = useFormValidation();

  const { data: categoryData } = useFetch(
    apis.category.getAll,
    validToken,
  );

  const [form, setForm] = useState({
    name: "",
    category: "",
    image: null,
    icon: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file, field) => {
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      name: { required: true, label: "name" },
      category: { required: true, label: "Category" },
      image: { required: true, label: "image" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);
    if (form.icon) formData.append("icon", form.icon);

    await postData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Created successfully");
      navigate("/sub-category/list");
    } else if (postError) {
      toast.error(postError);
    };
  }, [response, postError, navigate]);

  const categories = categoryData?.data || [];

  return (
    <FormWrapper title="Add New Sub Category" onSubmit={handleSubmit}>
      <Select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        options={categories}
        optionKey="_id"
        optionValue="name"
        error={errors.category}
        width="col-md-6"
        placeholder="Select a Category"
        required
      />

      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        width="col-md-6"
        placeholder="Enter Name"
        required
      />

      <Image
        label="Image"
        name="image"
        value={form.image}
        onChange={(file) => handleFileChange(file, "image")}
        error={errors.image}
        width="col-md-12"
        placeholder="image"
        required
      />

      <Image
        label="Icon"
        name="icon"
        value={form.icon}
        onChange={(file) => handleFileChange(file, "icon")}
        error={errors.icon}
        width="col-md-12"
        placeholder="icon"
      />
    </FormWrapper>
  );
};

export default AddSubCategoryPage;
