type TagProps = {
  title: string;
  isSelected?: boolean;
  onSelectCategory: (title: string) => void;
};

export function Tag({ title, isSelected = false, onSelectCategory }: TagProps) {
  return (
    <button
      className={`group rounded-full border border-purple-100 px-4 py-1 text-sm text-purple-100 hover:bg-purple-200 hover:text-gray-100 ${isSelected ? 'border-purple-200 bg-purple-200 text-gray-100' : ''} cursor-pointer`}
      onClick={() => onSelectCategory(title)}
    >
      {title}
    </button>
  );
}
