import Head from 'next/head';
import Layout, { siteTitle } from './components/layout';
import utilStyles from '../styles/utils.module.css';
import { sourceData } from '../lib/sourceData';
import Link from 'next/link';
import Date from './components/date';

export async function getStaticProps() {
  const { posts } = sourceData;

  //create a sort post by date
  posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    props: { 
      allPostsData: posts,
     },
  };
}

export default function Home({ allPostsData }) {
  console.log(allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Link href={`/users`}>Go to Users!</Link>
        <p>
          I'm a skilled programmer, proficient in various languages and frameworks. I enjoy tackling complex challenges and finding innovative solutions. Continuously learning and adapting, I strive to develop efficient, user-friendly software solutions that make a positive impact.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>{title}</Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
              </li>
            ))}
          </ul>
        </section>
    </Layout>
  );
}