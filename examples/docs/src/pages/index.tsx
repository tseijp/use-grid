import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {useGrid} from 'use-grid/src'
import {Home} from '../../components/Home'
import {Live} from '../../components/Live'

const Code = `
function App () {
  const [fontSize, set] = useGrid({xs: '2rem', md: 50, lg: 100})
  const handleClick = () => set(p => ({...p, md: p.lg, lg: p.md}))
  return (
    <div
      style={{fontSize}}
      onClick={handleClick}>
      🤏 use-grid
    </div>
  )
}`.trim();

const LINK = [
    'https://github.com/streamich/use-media',
    'https://github.com/cats-oss/use-intersection',
    'https://getbootstrap.com/docs/4.2/layout/grid/'
]

export default function App () {
    const {siteConfig} = useDocusaurusContext()
    return (
      <Layout
        title={`${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <Home>
          <Live hero code={Code} scope={{ React, useGrid }}>
            <Home.Header>
              <Live.Preview/>
              <Home.Title>
                <Home.Tagline>use-grid is</Home.Tagline>
                <Home.Content>
                  a hook to build responsive layouts of all shapes and sizes.
                </Home.Content>
                <Home.Content>
                  a fork of <a href={LINK[0]}>👌 use-media</a> that track the state of CSS media queries,
                </Home.Content>
                <Home.Content>
                  a fork of <a href={LINK[1]}>👏 use-intersection</a> that track whether the target intersects,
                </Home.Content>
                <Home.Content>
                  and remake of <a href={LINK[2]}>🅱 bootstrap</a> grid system thanks to responsive column system.
                </Home.Content>
              </Home.Title>
              <Live.Container style={{maxWidth: "34rem"}}>
                <Live.Editor style={{minHeight: "auto"}}/>
                <Live.Error />
              </Live.Container>
            </Home.Header>
          </Live>
        </Home>
      </Layout>
    );
}
