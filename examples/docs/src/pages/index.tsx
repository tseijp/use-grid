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
