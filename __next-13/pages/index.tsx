import { User } from "@prisma/client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Button } from "components/Button/Button";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  return {
    //HACK: otherwise next complains about the Date object(s) on the user model
    props: { users: JSON.parse(JSON.stringify(users)) },
    revalidate: 10,
  };
};

export default function Web({ users }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://next-enterprise.vercel.app/" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Fitness Pal</title>
      </Head>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            USERS
            <ul>
              {users.map((user: User) => (
                <li key={user.email}>{user.email}</li>
              ))}
            </ul>
            <Button
              href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
              intent="secondary"
            >
              Deploy Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
