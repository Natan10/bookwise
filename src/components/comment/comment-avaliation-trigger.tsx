type CommentAvaliationTriggerProps = {
  setAvaliation: () => void;
};

export function CommentAvaliationTrigger({
  setAvaliation,
}: CommentAvaliationTriggerProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <span className="text-gray-200 text-sm">Avaliações</span>
      <button
        onClick={setAvaliation}
        className="outline-none bg-transparent text-purple-100 text-base font-bold"
      >
        Avaliar
      </button>
    </div>
  );
}
