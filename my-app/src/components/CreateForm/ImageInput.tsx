export const ImageInput = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type } = e.target;
    if (type === "file") {
      console.log((e.target as HTMLInputElement).files?.[0]);
    }
  };

  return (
    <div>
      <label htmlFor="image">Upload Image</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};
