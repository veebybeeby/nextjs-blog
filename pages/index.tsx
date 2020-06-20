import Head from 'next/head'
import Layout from 'components/layout'
import { getAllGalleries, getPerson } from 'lib/graph-cms'
import GraphImage from 'graphcms-image'
import Link from 'next/link'

export default function Home({ galleries, person }) {
  return (
    <Layout person={person} home>
      <Head>
        <title>{person.name}</title>
      </Head>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {galleries.map(gallery => (
          <Link href="/galleries/[slug]" as={`/galleries/${gallery.slug}`} >
            <a>
              <div 
                style={{
                  position: 'relative',
                  width: '18rem',
                  height: '18rem',
                  margin: '32px 16px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GraphImage
                  image={gallery.image}
                  maxWidth={500}
                  style={{
                    width: '18rem',
                    height: '18rem',
                  }}
                />
                <h2 
                  style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '-4rem',
                    left: '1rem',
                    fontSize: '4rem',
                  }}
                >
                  {gallery.name}
                </h2>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const galleries = await getAllGalleries()
  const person = await getPerson()
  return {
    props: {
      galleries: galleries,
      person: person
    }
  }
}
