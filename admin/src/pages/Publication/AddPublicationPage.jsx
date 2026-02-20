import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import Textarea from "../../components/Input/Textarea";
import TextEditor from "../../components/Input/TextEditor";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis from "../../apis/apis";

const AddPublicationPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const { postData, response, postError } = useCreate(apis.publication.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    tags: "",
    shortDescription: "",
    fullDescription: "",
    image: null,
    banner: null,
  });

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
      tags: { required: true, label: "tag" },
      shortDescription: { required: true, label: "short description" },
      image: { required: true, label: "image" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("tags", form.tags);
    formData.append("shortDescription", form.shortDescription);
    formData.append("fullDescription", form.fullDescription);
    if (form.image) formData.append("image", form.image);
    if (form.banner) formData.append("banner", form.banner);

    await postData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Created successfully");
      navigate("/publication/list");
    } else if (postError) {
      toast.error(postError);
    };
  }, [response, postError, navigate]);

  return (
    <FormWrapper title="Add Publication" onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        error={errors.title}
        width="col-md-6"
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
        label="Tag"
        name="tags"
        type="text"
        value={form.tags}
        onChange={handleChange}
        required
        error={errors.tags}
        width="col-md-6"
      />

      <Image
        label="Image"
        name="image"
        value={form.image}
        onChange={(file) => handleFileChange(file, "image")}
        required
        error={errors.image}
        width="col-md-6"
        placeholder="image"
      />

      <Image
        label="Banner"
        name="banner"
        value={form.banner}
        onChange={(file) => handleFileChange(file, "banner")}
        error={errors.banner}
        width="col-md-6"
        placeholder="banner"
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

export default AddPublicationPage;
