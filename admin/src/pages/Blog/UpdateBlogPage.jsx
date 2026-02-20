import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import Textarea from "../../components/Input/Textarea";
import TextEditor from "../../components/Input/TextEditor";
import useFetch from "../../hooks/useFetch";
import usePatch from "../../hooks/usePatch";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis, { API_BASE_URL } from "../../apis/apis";

const UpdateBlogPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();
  const { errors, validate } = useFormValidation();

  const { data } = useFetch(
    `${apis.blog.getSingle}/${id}`,
    validToken
  );

  const {
    updateData,
    response,
    updateError,
  } = usePatch(`${apis.blog.update}/${id}`);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    shortDescription: "",
    fullDescription: "",
    image: null,
    banner: null,
  });

  useEffect(() => {
    if (data?.success && data?.data) {
      const blog = data?.data;

      setForm({
        title: blog.title || "",
        date: blog.date ? blog.date.split("T")[0] : "",
        time: blog.time || "",
        shortDescription: blog.shortDescription || "",
        fullDescription: blog.fullDescription || "",
        image: blog?.image ? `${API_BASE_URL}/${blog?.image}` : null,
        banner: blog?.banner ? `${API_BASE_URL}/${blog?.banner}` : null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value) => {
    setForm((prev) => ({ ...prev, fullDescription: value }));
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
      image: { required: true, label: "image" },
      shortDescription: { required: true, label: "short description" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("shortDescription", form.shortDescription);
    formData.append("fullDescription", form.fullDescription);

    if (form.image) formData.append("image", form.image);
    if (form.banner) formData.append("banner", form.banner);

    await updateData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Updated successfully");
      navigate("/blog/list");
    } else if (updateError) {
      toast.error(updateError);
    };
  }, [response, updateError, navigate]);

  return (
    <FormWrapper title="Update Blog" onSubmit={handleSubmit}>
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

      <Image
        label="Image"
        name="image"
        value={form.image}
        onChange={(file) => handleFileChange(file, "image")}
        width="col-md-6"
        required
        placeholder="Update image"
      />

      <Image
        label="Banner"
        name="banner"
        value={form.banner}
        onChange={(file) => handleFileChange(file, "banner")}
        width="col-md-6"
        placeholder="Update banner"
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

      <div className="col-md-12 mb-4">
        <label className="form-label">Full Description</label>
        <TextEditor
          id="fullDescription"
          name="fullDescription"
          value={form.fullDescription}
          onChange={handleEditorChange}
          height={300}
        />
      </div>
    </FormWrapper>
  );
};

export default UpdateBlogPage;
