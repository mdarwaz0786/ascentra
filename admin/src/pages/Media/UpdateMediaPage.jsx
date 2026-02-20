import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import Textarea from "../../components/Input/Textarea";
import useFetch from "../../hooks/useFetch";
import usePatch from "../../hooks/usePatch";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis, { API_BASE_URL } from "../../apis/apis";

const UpdateMediaPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();
  const { errors, validate } = useFormValidation();

  const { data } = useFetch(
    `${apis.media.getSingle}/${id}`,
    validToken
  );

  const {
    updateData,
    response,
    updateError,
  } = usePatch(`${apis.media.update}/${id}`);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    link: "",
    source: "",
    shortDescription: "",
    image: null,
  });

  useEffect(() => {
    if (data?.success && data?.data) {
      const d = data?.data;

      setForm({
        title: d.title || "",
        date: d.date ? d.date.split("T")[0] : "",
        time: d.time || "",
        link: d.link || "",
        source: d.source || "",
        shortDescription: d.shortDescription || "",
        image: d?.image ? `${API_BASE_URL}/${d?.image}` : null,
      });
    }
  }, [data]);

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

    await updateData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Updated successfully");
      navigate("/media/list");
    } else if (updateError) {
      toast.error(updateError);
    };
  }, [response, updateError, navigate]);

  return (
    <FormWrapper title="Update Media" onSubmit={handleSubmit}>
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
        width="col-md-12"
        required
        placeholder="Update image"
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

export default UpdateMediaPage;
