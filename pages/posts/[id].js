import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { sourceData } from '../../lib/sourceData';
import Date from '../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
    const postData = sourceData.posts.find(
        (post) => post.id === params.id
    )
    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }) {
  return (
      <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <br />
                <div dangerouslySetInnerHTML={{ __html: postData.content }} />
            </article>
            {postData.id}
      </Layout>
  );
}

export async function getStaticPaths() {
    const data = sourceData.posts;
  
    const paths = data.map((post) => ({
      params: { id: post.id },
    }));
  
    return {
      paths,
      fallback: false,
    };
}
