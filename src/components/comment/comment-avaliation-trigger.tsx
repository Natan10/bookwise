type CommentAvaliationTriggerProps = {
  setAvaliation: () => void;
};

export function CommentAvaliationTrigger({ setAvaliation }: CommentAvaliationTriggerProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="text-sm text-gray-200">Avaliações</span>
      <button
        onClick={setAvaliation}
        className="bg-transparent text-base font-bold text-purple-100 outline-none"
      >
        Avaliar
      </button>
    </div>
  );
}
