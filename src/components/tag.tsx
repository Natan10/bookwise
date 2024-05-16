type TagProps = {
  title: string;
  isSelected?: boolean;
};

export function Tag({ title, isSelected = false }: TagProps) {
  return (
    <label
      htmlFor="type"
      className={`
      group px-4 py-1
      rounded-full border border-purple-100 hover:bg-purple-200
      text-sm text-purple-100 hover:text-gray-100
      has-[input:checked]:bg-purple-200 has-[input:checked]:text-gray-100 has-[input:checked]:border-purple-200
      cursor-pointer
    `}
    >
      {title}
      <input
        id="type"
        type="checkbox"
        defaultChecked={isSelected}
        className="hidden"
        value={title}
      />
    </label>
  );
}
