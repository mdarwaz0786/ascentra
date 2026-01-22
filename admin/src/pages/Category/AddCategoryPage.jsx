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

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const { postData, response, postError } = useCreate(apis.category.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    name: "",
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
      image: { required: true, label: "image" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", form.name);
    if (form.image) formData.append("image", form.image);
    if (form.icon) formData.append("icon", form.icon);

    await postData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Created successfully");
      navigate("/category/list");
    } else if (postError) {
      toast.error(postError);
    };
  }, [response, postError, navigate]);

  return (
    <FormWrapper title="Add New Category" onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        error={errors.name}
        width="col-md-12"
        placeholder="Enter Name"
      />

      <Image
        label="Image"
        name="image"
        value={form.image}
        onChange={(file) => handleFileChange(file, "image")}
        required
        error={errors.image}
        width="col-md-12"
        placeholder="image"
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

export default AddCategoryPage;
