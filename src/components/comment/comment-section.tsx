import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import * as Components from "./index";
import {
  addComment,
  getBookById,
} from "@/app/(dashboard)/dashboard/explorar/_actions";
import { CommentCardDto } from "./dtos/comment-card-dto";
import { Modal } from "../modal";

export function CommentSection({
  bookId,
  close,
}: {
  bookId: number | null;
  close: () => void;
}) {
  const [comment, setComment] = useState("");
  const [shouldShowLoginModal, setShouldShowLoginModal] = useState(false);

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["book_informations", bookId],
    queryFn: async () => {
      if (!bookId) return null;
      const book = await getBookById(bookId);
      return book;
    },
    enabled: !!bookId,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    gcTime: 1000,
  });

  const comments =
    data &&
    (data.avaliations.map((avaliation) => ({
      comment: avaliation.comment,
      commentData: avaliation.createdAt,
      id: avaliation.id,
      rate: avaliation.rate,
      profile: avaliation.profile
        ? {
            username: avaliation.profile.username,
            email: avaliation.profile.email,
            avatar: avaliation.profile.avatar,
          }
        : null,
    })) as CommentCardDto[]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      comment,
      rate,
    }: {
      comment: string;
      rate: number;
    }) => {
      if (!bookId) return null;
      await addComment({
        bookId: bookId,
        comment,
        rate,
        profileId: 1,
      });
    },
    onError: (e) => toast.error(e.message),
    onSuccess: () => setComment(""),
  });

  async function handleSendComment(comment: string, rate: number) {
    await mutateAsync({
      comment,
      rate,
    });
    await queryClient.refetchQueries({
      queryKey: ["book_informations", bookId],
      exact: true,
    });
  }

  if (!bookId) return null;

  return (
    <Components.CommentRoot>
      <Components.CommentClose onClick={close} />
      {data && (
        <Components.CommentBookCard
          pages={data.numOfPages}
          categories={data.categories}
          title={data.title}
          author={data.author}
          bookImage={data.coverImage}
          rate={Math.trunc(data.average)}
        />
      )}
      {isLoading && <Components.CommentLoadCard />}

      <div className="space-y-3 mt-11">
        {!isLoading && (
          <>
            {!session && (
              <Components.CommentAvaliationTrigger
                setAvaliation={() => setShouldShowLoginModal(true)}
              />
            )}
            {session && (
              <Components.CommentAvaliationInput
                isLoading={isPending || isLoading}
                onSendComment={handleSendComment}
                comment={comment}
                setComment={setComment}
                close={close}
              />
            )}
          </>
        )}

        {comments && (
          <Components.CommentAvaliationContainer comments={comments} />
        )}

        {isLoading && (
          <div className="mt-3 space-y-3">
            <Components.CommentLoadComment />
            <Components.CommentLoadComment />
            <Components.CommentLoadComment />
          </div>
        )}
      </div>

      {shouldShowLoginModal && (
        <Modal close={() => setShouldShowLoginModal(false)} />
      )}
    </Components.CommentRoot>
  );
}
