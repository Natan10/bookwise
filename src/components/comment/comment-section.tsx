import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { addComment, getBookById } from '@/app/(dashboard)/dashboard/explorar/_actions';

import { Modal } from '../modal';
import { CommentCardDto } from './dtos/comment-card-dto';
import * as Components from './index';

export function CommentSection({ bookId, close }: { bookId: number | null; close: () => void }) {
  const [shouldShowLoginModal, setShouldShowLoginModal] = useState(false);

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ['book_informations', bookId],
    queryFn: async () => {
      if (!bookId) return null;
      const [book, err] = await getBookById({ bookId });
      if (err) throw err;
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
    mutationFn: async ({ comment, rate }: { comment: string; rate: number }) => {
      if (!session || !session.user) return;
      if (!bookId) return null;
      const [, err] = await addComment({
        bookId: bookId,
        comment,
        rate,
        profile: {
          email: session.user.email!,
          avatar: session.user.image || undefined,
          username: session.user.name || undefined,
        },
      });

      if (err) throw err;
    },
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['book_informations', bookId],
        type: 'active',
        exact: true,
      });
      await queryClient.invalidateQueries({
        queryKey: ['books_by_category'],
        type: 'all',
      });
    },
  });

  async function handleSendComment(comment: string, rate: number) {
    await mutateAsync({
      comment,
      rate,
    });
    await queryClient.refetchQueries({
      queryKey: ['book_informations', bookId],
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

      <div className="mt-11 space-y-3">
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
                close={close}
              />
            )}
          </>
        )}

        {comments && <Components.CommentAvaliationContainer comments={comments} />}

        {isLoading && (
          <div className="mt-3 space-y-3">
            <Components.CommentLoadComment />
            <Components.CommentLoadComment />
            <Components.CommentLoadComment />
          </div>
        )}
      </div>

      {shouldShowLoginModal && <Modal close={() => setShouldShowLoginModal(false)} />}
    </Components.CommentRoot>
  );
}
