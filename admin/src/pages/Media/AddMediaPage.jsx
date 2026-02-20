import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import Textarea from "../../components/Input/Textarea";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis from "../../apis/apis";

const AddMediaPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const { postData, response, postError } = useCreate(apis.media.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    link: "",
    source: "",
    shortDescription: "",
    image: null,
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
      title: { required: true, label: "title" },
      date: { required: true, label: "date" },
      time: { required: true, label: "time" },
      link: { required: true, label: "link" },
      source: { required: true, label: "source" },
      shortDescription: { required: true, label: "short description" },
      image: { required: true, label: "image" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("link", form.link);
    formData.append("source", form.source);
    formData.append("shortDescription", form.shortDescription);
    if (form.image) formData.append("image", form.image);

    await postData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Created successfully");
      navigate("/media/list");
    } else if (postError) {
      toast.error(postError);
    };
  }, [response, postError, navigate]);

  return (
    <FormWrapper title="Add Media" onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        error={errors.title}
        width="col-md-12"
        placeholder="Enter Title"
      />

      <Input
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        error={errors.date}
        width="col-md-6"
      />

      <Input
        label="Time"
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
        required
        error={errors.time}
        width="col-md-6"
      />

      <Input
        label="Link"
        name="link"
        type="link"
        value={form.link}
        onChange={handleChange}
        required
        error={errors.link}
        width="col-md-6"
      />

      <Input
        label="Source"
        name="source"
        type="source"
        value={form.source}
        onChange={handleChange}
        required
        error={errors.source}
        width="col-md-6"
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

      <div className="col-md-12">
        <Textarea
          label="Short Description"
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          required
          error={errors.shortDescription}
          rows={8}
        />
      </div>
    </FormWrapper>
  );
};

export default AddMediaPage;
