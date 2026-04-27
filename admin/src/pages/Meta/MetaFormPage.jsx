import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import Textarea from "../../components/Input/Textarea";
import Select from "../../components/Input/Select";
import useCreate from "../../hooks/useCreate";
import usePatch from "../../hooks/usePatch";
import useFetch from "../../hooks/useFetch";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis, { API_BASE_URL } from "../../apis/apis";

const MetaFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();

  const isEdit = Boolean(id);

  const { errors, validate } = useFormValidation();

  const { postData, response, postError } = useCreate(apis.meta.create);
  const { updateData, response: updateResponse, updateError } = usePatch(
    isEdit ? `${apis.meta.update}/${id}` : ""
  );

  const { data } = useFetch(isEdit ? `${apis.meta.getSingle}/${id}` : null, validToken);

  const [form, setForm] = useState({
    pageName: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaAuthor: "",
    metaImage: null,
  });

  useEffect(() => {
    if (data?.data) {
      const meta = data?.data;

      setForm({
        pageName: meta.pageName || "",
        metaTitle: meta.metaTitle || "",
        metaDescription: meta.metaDescription || "",
        metaKeywords: meta.metaKeywords || "",
        metaAuthor: meta.metaAuthor || "",
        metaImage: meta?.metaImage ? `${API_BASE_URL}/${meta?.metaImage}` : null,
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
      pageName: { required: true, label: "Page name" },
      metaTitle: { required: true, label: "Meta title" },
      metaDescription: { required: true, label: "Meta description" },
      metaKeywords: { required: true, label: "Meta keywords" },
    });

    if (!isValid) return;

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    if (isEdit) {
      await updateData(formData, validToken, true);
    } else {
      await postData(formData, validToken, true);
    }
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Meta created successfully");
      navigate("/meta/list");
    }

    if (updateResponse?.success) {
      toast.success("Meta updated successfully");
      navigate("/meta/list");
    }

    if (postError) toast.error(postError);
    if (updateError) toast.error(updateError);
  }, [response, updateResponse, postError, updateError, navigate]);

  const pageOptions = [
    { key: "home", value: "Home" },
    { key: "about-us", value: "About Us" },
    { key: "contact-us", value: "Contact Us" },
    { key: "our-team", value: "Our Founders" },
    { key: "our-growth-framework", value: "Our Growth Framework" },
    { key: "publication", value: "Publication" },
    { key: "media", value: "Media" },
    { key: "news-and-blog", value: "News & Blog" },
    { key: "career", value: "Career" },
    {
      key: "research-academic-and-innovation-partnerships",
      value: "Research Academic & Innovation Partnerships",
    },
    {
      key: "in-country-representation-and-market-growth",
      value: "In Country Representation & Market Growth",
    },
    {
      key: "events-outreach-and-engagement",
      value: "Events Outreach & Engagement",
    },
    {
      key: "operational-and-compliance-support",
      value: "Operational & Compliance Support",
    },
  ];

  return (
    <FormWrapper title={isEdit ? "Update Meta" : "Add Meta"} onSubmit={handleSubmit}>
      <Select
        label="Page Name"
        name="pageName"
        value={form.pageName}
        onChange={handleChange}
        options={pageOptions}
        optionKey="key"
        optionValue="value"
        required
        error={errors.pageName}
        width="col-md-6"
      />

      <Input
        label="Meta Title"
        name="metaTitle"
        value={form.metaTitle}
        onChange={handleChange}
        required
        error={errors.metaTitle}
        width="col-md-6"
      />

      <Input
        label="Meta Keywords (comma separated)"
        name="metaKeywords"
        value={form.metaKeywords}
        onChange={handleChange}
        required
        error={errors.metaKeywords}
        width="col-md-6"
      />

      <Input
        label="Meta Author"
        name="metaAuthor"
        value={form.metaAuthor}
        onChange={handleChange}
        width="col-md-6"
      />

      <Image
        label="Meta Image (1200x630)"
        name="metaImage"
        value={form.metaImage}
        onChange={(file) => handleFileChange(file, "metaImage")}
        width="col-md-6"
      />

      <Textarea
        label="Meta Description"
        name="metaDescription"
        value={form.metaDescription}
        onChange={handleChange}
        required
        error={errors.metaDescription}
        rows={6}
        width="col-md-6"
      />
    </FormWrapper>
  );
};

export default MetaFormPage;