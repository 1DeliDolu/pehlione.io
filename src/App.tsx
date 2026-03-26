
import { useEffect, useMemo, useState, useCallback } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import CV from './components/Sections/CV'
import Hobbies from './components/Sections/Hobbies'
import Foto from './page/Foto'
import Certificates from './components/Sections/Certificates'
import Projects from './components/Sections/Projects'
import Repos from './components/Sections/Repos'
import DeveloperInfo from './components/Sections/DeveloperInfo'
import Box from '@mui/material/Box'
import AgentDoc from './components/Lebenslauf'
import Button from '@mui/material/Button'
import { UploadForm } from '@/components/UploadForm'


type MainView = 'default' | 'agentDoc' | 'hobbies' | 'certificates' | 'projects' | 'repos' | 'developer' | 'foto'
type FotoCategory = 'gartenarbeit' | 'fotografie' | null

const seoDefaults = {
  title: 'Mustafa Ozdemir | Junior Anwendungsentwickler, Software Developer & Software Entwickler',
  description:
    'Mustafa Ozdemir ist Junior Anwendungsentwickler und Software Developer in Deutschland mit Fokus auf Java, Golang, Java Spring, C# .NET, TypeScript, React, PHP Laravel, Symfony, Grafana und PRTG.',
  keywords:
    'Junior Anwendungsentwickler, Software Developer, Software Entwickler, Java, Golang, Java Spring, C# .NET, TypeScript, React, PHP, Laravel, Symfony, Grafana, PRTG, Webentwickler, Backend Developer, Frontend Developer, Deutschland',
}

const setMetaContent = (selector: string, content: string) => {
  if (typeof document === 'undefined') return
  const node = document.querySelector<HTMLMetaElement>(selector)
  if (node) node.setAttribute('content', content)
}

function App() {
  const [ drawerOpen, setDrawerOpen ] = useState( false )
  const [ mainView, setMainView ] = useState<MainView>( 'default' )
  const [ fotoCategory, setFotoCategory ] = useState<FotoCategory>( null )
  const [ pendingHash, setPendingHash ] = useState<string | null>( null )
  const showUploadForm = typeof window !== 'undefined' && new URLSearchParams( window.location.search ).has( 'upload' )

  const basePath = useMemo( () => {
    const base = ( import.meta.env.BASE_URL as string | undefined ) || '/'
    return base.endsWith( '/' ) ? base.slice( 0, -1 ) : base
  }, [] )

  const resolveRoute = useCallback( ( pathname: string ): { view: MainView; category: FotoCategory } => {
    const withoutBase = basePath && pathname.startsWith( basePath )
      ? pathname.slice( basePath.length ) || '/'
      : pathname
    const clean = withoutBase.split( '?' )[ 0 ].split( '#' )[ 0 ]
    const [ segment, sub ] = clean.replace( /^\/+/, '' ).split( '/' )

    if ( !segment ) return { view: 'default' as const, category: null }
    if ( segment === 'cv' ) return { view: 'agentDoc' as const, category: null }
    if ( segment === 'hobby' || segment === 'hobbies' ) return { view: 'hobbies' as const, category: null }
    if ( segment === 'certificates' || segment === 'certificate' ) return { view: 'certificates' as const, category: null }
    if ( segment === 'projects' ) return { view: 'projects' as const, category: null }
    if ( segment === 'repos' || segment === 'repositories' ) return { view: 'repos' as const, category: null }
    if ( segment === 'developer' ) return { view: 'developer' as const, category: null }
    if ( segment === 'foto' ) {
      const cat: FotoCategory = sub === 'fotografie'
        ? 'fotografie'
        : sub === 'gartenarbeit'
          ? 'gartenarbeit'
          : null
      return { view: 'foto' as const, category: cat }
    }

    return { view: 'default' as const, category: null }
  }, [ basePath ] )

  const toPath = ( view: MainView, category?: FotoCategory ) => {
    if ( view === 'default' ) return '/'
    if ( view === 'agentDoc' ) return '/cv'
    if ( view === 'hobbies' ) return '/hobby'
    if ( view === 'certificates' ) return '/certificates'
    if ( view === 'projects' ) return '/projects'
    if ( view === 'repos' ) return '/repos'
    if ( view === 'developer' ) return '/developer'
    if ( view === 'foto' ) return `/foto/${ category ?? 'gartenarbeit' }`
    return '/'
  }

  const pushRoute = ( view: MainView, category?: FotoCategory ) => {
    if ( typeof window === 'undefined' ) return
    const target = toPath( view, category )
    const fullPath = basePath ? `${ basePath }${ target }` : target
    if ( window.location.pathname !== fullPath ) {
      window.history.pushState( {}, '', fullPath + window.location.search )
    }
  }

  const navigate = ( view: MainView, category?: FotoCategory, hash?: string ) => {
    if ( category !== undefined ) setFotoCategory( category )
    setMainView( view )
    pushRoute( view, category )
    if ( hash ) setPendingHash( hash )
  }

  useEffect( () => {
    if ( typeof window === 'undefined' ) return
    const pending = sessionStorage.getItem( 'spa-redirect' )
    if ( pending ) {
      sessionStorage.removeItem( 'spa-redirect' )
      window.history.replaceState( {}, '', pending )
    }
    const { view, category } = resolveRoute( window.location.pathname )
    setMainView( view )
    if ( category ) setFotoCategory( category )
    const onPop = () => {
      const next = resolveRoute( window.location.pathname )
      setMainView( next.view )
      setFotoCategory( next.category )
    }
    window.addEventListener( 'popstate', onPop )
    return () => window.removeEventListener( 'popstate', onPop )
  }, [ resolveRoute ] )

  useEffect( () => {
    if ( typeof window === 'undefined' ) return
    if ( !pendingHash ) return
    if ( mainView !== 'default' ) return
    const id = pendingHash.replace( /^#/, '' )
    const rootPath = basePath ? `${ basePath }/` : '/'
    const hashValue = id ? `#${ id }` : ''
    const nextUrl = rootPath + window.location.search + hashValue
    const currentUrl = window.location.pathname + window.location.search + window.location.hash
    if ( currentUrl !== nextUrl ) {
      window.history.replaceState( {}, '', nextUrl )
    }
    const el = id ? document.getElementById( id ) : null
    if ( el ) {
      el.scrollIntoView( { behavior: 'smooth', block: 'start' } )
    }
    setPendingHash( null )
  }, [ pendingHash, mainView, basePath ] )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const path = toPath(mainView, fotoCategory)
    const absoluteUrl = new URL(path, 'https://pehlione.com').toString()
    const routeSeo: Record<Exclude<MainView, 'foto'>, typeof seoDefaults> = {
      default: seoDefaults,
      agentDoc: {
        title: 'Lebenslauf | Mustafa Ozdemir - Junior Anwendungsentwickler',
        description:
          'Lebenslauf von Mustafa Ozdemir, Junior Anwendungsentwickler und Software Entwickler mit Projekten in Java, Golang, React, PHP Laravel, Symfony und C# .NET.',
        keywords:
          'Lebenslauf Junior Anwendungsentwickler, CV Software Developer, Java, Golang, React, Laravel, Symfony, C# .NET',
      },
      hobbies: {
        title: 'Hobbys und Interessen | Mustafa Ozdemir',
        description:
          'Persoenliche Interessen von Mustafa Ozdemir mit Einblicken in Fotografie, Gartenarbeit und die kreative Arbeitsweise hinter dem Portfolio.',
        keywords:
          'Mustafa Ozdemir Hobbys, Fotografie, Gartenarbeit, Portfolio Deutschland',
      },
      certificates: {
        title: 'Zertifikate | Mustafa Ozdemir - Software Developer',
        description:
          'Zertifikate und Weiterbildungen von Mustafa Ozdemir in Java, React, Golang, PHP, Kubernetes, DevOps und Full-Stack-Entwicklung.',
        keywords:
          'Zertifikate Java React Golang PHP Kubernetes DevOps Full Stack Software Developer',
      },
      projects: {
        title: 'Projekte | Mustafa Ozdemir - Java, Golang, React, Laravel, Symfony, .NET',
        description:
          'Softwareprojekte von Mustafa Ozdemir mit Java, Golang, TypeScript, React, PHP Laravel, Symfony, C# .NET, Grafana und PRTG.',
        keywords:
          'Java Projekte, Golang Projekte, React Portfolio, Laravel, Symfony, C# .NET, Grafana, PRTG',
      },
      repos: {
        title: 'Repositories | Mustafa Ozdemir',
        description:
          'GitHub Repositories und Codebeispiele von Mustafa Ozdemir als Junior Anwendungsentwickler und Software Developer.',
        keywords:
          'GitHub Repositories Software Developer Junior Anwendungsentwickler',
      },
      developer: {
        title: 'Entwicklerprofil | Mustafa Ozdemir - Junior Anwendungsentwickler',
        description:
          'Entwicklerprofil von Mustafa Ozdemir mit Schwerpunkten in Java, Java Spring, Golang, C# .NET, TypeScript, React, PHP Laravel, Symfony, Grafana und PRTG.',
        keywords:
          'Entwicklerprofil, Junior Anwendungsentwickler, Software Entwickler, Java Spring, Golang, .NET, React, Laravel, Symfony, Grafana, PRTG',
      },
    }

    const fotoSeo =
      fotoCategory === 'fotografie'
        ? {
            title: 'Fotografie | Mustafa Ozdemir',
            description:
              'Fotografie-Seite von Mustafa Ozdemir mit Natur- und Landschaftsaufnahmen als Teil des persoenlichen Portfolios.',
            keywords: 'Fotografie Portfolio Mustafa Ozdemir Naturfotografie',
          }
        : {
            title: 'Gartenarbeit | Mustafa Ozdemir',
            description:
              'Gartenarbeit und Pflanzenfotos von Mustafa Ozdemir als Teil des persoenlichen Portfolios und seiner praktischen Interessen.',
            keywords: 'Gartenarbeit Portfolio Mustafa Ozdemir Pflanzen',
          }

    const currentSeo = mainView === 'foto' ? fotoSeo : routeSeo[mainView]

    document.title = currentSeo.title
    document.documentElement.lang = 'de'
    setMetaContent('meta[name="title"]', currentSeo.title)
    setMetaContent('meta[name="description"]', currentSeo.description)
    setMetaContent('meta[name="keywords"]', currentSeo.keywords)
    setMetaContent('meta[property="og:title"]', currentSeo.title)
    setMetaContent('meta[property="og:description"]', currentSeo.description)
    setMetaContent('meta[property="og:url"]', absoluteUrl)
    setMetaContent('meta[property="twitter:title"]', currentSeo.title)
    setMetaContent('meta[property="twitter:description"]', currentSeo.description)
    setMetaContent('meta[property="twitter:url"]', absoluteUrl)

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = absoluteUrl
  }, [mainView, fotoCategory])
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <a id="home" />
      <Header
        open={drawerOpen}
        onOpen={() => setDrawerOpen( true )}
        onClose={() => setDrawerOpen( false )}
        onSelectMain={( v, hash ) => {
          console.log( 'mainView', v );
          navigate( v, undefined, hash )
          setDrawerOpen( false )
        }}
      />
      <Box
        component="main"
        sx={{
          // AppBar yüksekliği kadar üst boşluk
          pt: { xs: '65px', sm: '64px' },
          // Mini (kapalı) ve açık durum için sol boşluk
          ml: { xs: drawerOpen ? '240px' : '65px', sm: drawerOpen ? '240px' : '65px' },
          mr: { xs: drawerOpen ? '240px' : '65px', sm: drawerOpen ? '240px' : '65px' },
        }}
      >
        {showUploadForm ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <UploadForm />
            <div className="mt-6">
              <Button variant="outlined" href={window.location.pathname}>
                App anzeigen
              </Button>
            </div>
          </section>
        ) : mainView === 'agentDoc' ? (
          <section className="w-screen -ml-[65px] -mr-[65px] px-[calc(65px+1rem)] sm:px-[calc(65px+1.5rem)] lg:px-[calc(65px+2.5rem)] py-12">
            <AgentDoc />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => navigate( 'default' )}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'hobbies' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Hobbys • Details</h1>
            <Hobbies
              variant="detail"
              onOpenPage={( page ) => {
                navigate( 'foto', page )
              }}
              onOpenDeveloper={() => navigate( 'developer' )}
            />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => navigate( 'default' )}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'foto' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <Foto category={( fotoCategory ?? 'gartenarbeit' )} />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => navigate( 'default' )}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'certificates' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Zertifikate • Details</h1>
            <Certificates variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => navigate( 'default' )}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'projects' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Projekte • Details</h1>
            <Projects variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => navigate( 'default' )}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'repos' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Repositories • Details</h1>
            <Repos username="1DeliDolu" perPage={12} onOpenDrawer={() => setDrawerOpen( true )} variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => navigate( 'default' )}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'developer' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Anwendungsentwickler • Details</h1>
            <DeveloperInfo variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => navigate( 'default' )}>Zur Übersicht</Button>
            </div>
          </section>
        ) : (
          <>
            <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
              <h1 className="text-3xl font-bold mb-2">Mustafa's Portfolio</h1>

              <p className="text-neutral-700 dark:text-neutral-300">
                Diese Website dient als Portfolio und persönliche Seite von Mustafa.
                Die Grundversion ist fertiggestellt, weitere Funktionen und Inhalte werden nach und nach ergänzt.
                Hier finden Sie Informationen über meine Fähigkeiten, Projekte und Hobbys.
              </p>

            </section>
            <CV onOpenDrawer={() => setDrawerOpen( true )} />
            <Hobbies
              onOpenDrawer={() => setDrawerOpen( true )}
              onOpenPage={( page ) => {
                navigate( 'foto', page )
              }}
              onOpenDeveloper={() => navigate( 'developer' )}
            />
            <Certificates onOpenDrawer={() => setDrawerOpen( true )} />
            <Projects onOpenDrawer={() => setDrawerOpen( true )} />
            <Repos username="1DeliDolu" perPage={6} onOpenDrawer={() => setDrawerOpen( true )} />
            <DeveloperInfo onOpenDrawer={() => setDrawerOpen( true )} />
          </>
        )}
      </Box>
      <Box
        sx={{
          ml: { xs: drawerOpen ? '240px' : '57px', sm: drawerOpen ? '240px' : '65px' },
          mr: { xs: drawerOpen ? '240px' : '57px', sm: drawerOpen ? '240px' : '65px' },
        }}
      >
        {/* foto uploader */}

        {/*  <div id="foto-uploader">
          <UploadForm />
        </div> */}

        <Footer />
      </Box>
    </div>
  )
}

export default App
