type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostPageProps = {
  params: {
    id: string;
  };
};

export type { Post, PostPageProps };
