import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {Home} from '../../components/Home'
import {Live} from '../../components/Live'
import {useGrid} from 'use-grid'

const Code = `
function App () {
  const [fontSize, set] = useGrid({xs: '1rem', md: '50px', lg: '100px'})
  return <div style={{fontSize}}>🤏 use-grid</div>
}
render(
  <App/>
)
`.trim();

const LINK = [
    'https://github.com/streamich/use-media',
    'https://github.com/cats-oss/use-intersection',
    'https://getbootstrap.com/docs/4.2/layout/grid/'
]

export default function App () {
    const {siteConfig} = useDocusaurusContext()
    return (
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <Home>
          <Live hero code={Code} noInline scope={{ React, useGrid }}>
            <Home.Header>
              <Live.Preview/>
            </Home.Header>
            <Home.Title>
              <Home.Tagline>use-grid is</Home.Tagline>
              <Home.SupportingTagline>
                a hook to build responsive layouts of all shapes and sizes.
              </Home.SupportingTagline>
              <Home.Tagline>
                a fork of 👌 <a href={LINK[0]}>use-media</a> that track the state of CSS media queries,
              </Home.Tagline>
              <Home.Tagline>
                a fork of 👏 <a>use-intersection</a> that track whether the target intersects,
              </Home.Tagline>
              <Home.Tagline>
                and remake of 🅱 bootstrap grid system thanks to responsive column system.
              </Home.Tagline>
            </Home.Title>
            <Live.Container style={{maxWidth: "34rem"}}>
              <Live.Editor style={{minHeight: "auto"}}/>
              <Live.Error />
            </Live.Container>
          </Live>
        </Home>
      </Layout>
    );
}
