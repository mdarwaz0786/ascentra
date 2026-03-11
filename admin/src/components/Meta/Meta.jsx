import Input from "../Input/Input";
import Image from "../Input/Image";
import Textarea from "../Input/Textarea";

const Meta = ({
  form,
  setForm,
  errors = {},
  width = "col-md-6",
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setForm((prev) => ({ ...prev, metaImage: file }));
  };

  return (
    <>
      <Input
        label="Meta Title"
        name="metaTitle"
        value={form.metaTitle}
        onChange={handleChange}
        error={errors.metaTitle}
        width={width}
        placeholder="Enter Meta Title"
      />

      <Input
        label="Meta Keywords (comma separated)"
        name="metaKeywords"
        value={form.metaKeywords}
        onChange={handleChange}
        error={errors.metaKeywords}
        width={width}
        placeholder="Enter Meta Keywords"
      />

      <Input
        label="Meta Author"
        name="metaAuthor"
        value={form.metaAuthor}
        onChange={handleChange}
        width={width}
        placeholder="Enter Meta Author"
      />

      <Image
        label="Meta Image (1200 x 630)"
        name="metaImage"
        value={form.metaImage}
        onChange={handleFileChange}
        width={width}
      />

      <Textarea
        label="Meta Description"
        name="metaDescription"
        value={form.metaDescription}
        onChange={handleChange}
        error={errors.metaDescription}
        rows={6}
        width="col-md-12"
      />
    </>
  );
};

export default Meta;