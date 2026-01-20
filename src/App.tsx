
import { useState } from 'react'
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


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mainView, setMainView] = useState<'default' | 'agentDoc' | 'hobbies' | 'certificates' | 'projects' | 'repos' | 'developer' | 'foto'>('default')
  const [fotoCategory, setFotoCategory] = useState<'gartenarbeit' | 'fotografie' | null>(null)
  const showUploadForm = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('upload')
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <a id="home" />
      <Header
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        onSelectMain={(v) => {
          console.log('mainView', v);
          setMainView(v)
          setDrawerOpen(false)
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
              <Button variant="outlined" onClick={() => setMainView('default')}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'hobbies' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Hobbys • Details</h1>
            <Hobbies
              variant="detail"
              onOpenPage={(page) => {
                setFotoCategory(page)
                setMainView('foto')
              }}
              onOpenDeveloper={() => setMainView('developer')}
            />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => setMainView('default')}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'foto' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <Foto category={(fotoCategory ?? 'gartenarbeit')} />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => setMainView('default')}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'certificates' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Zertifikate • Details</h1>
            <Certificates variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => setMainView('default')}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'projects' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Projekte • Details</h1>
            <Projects variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => setMainView('default')}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'repos' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Repositories • Details</h1>
            <Repos username="1DeliDolu" perPage={12} onOpenDrawer={() => setDrawerOpen(true)} variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => setMainView('default')}>Zur Übersicht</Button>
            </div>
          </section>
        ) : mainView === 'developer' ? (
          <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
            <h1 className="text-3xl font-bold mb-4">Anwendungsentwickler • Details</h1>
            <DeveloperInfo variant="detail" />
            <div className="mt-6">
              <Button variant="outlined" onClick={() => setMainView('default')}>Zur Übersicht</Button>
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
            <CV onOpenDrawer={() => setDrawerOpen(true)} />
            <Hobbies
              onOpenDrawer={() => setDrawerOpen(true)}
              onOpenPage={(page) => {
                setFotoCategory(page)
                setMainView('foto')
              }}
              onOpenDeveloper={() => setMainView('developer')}
            />
            <Certificates onOpenDrawer={() => setDrawerOpen(true)} />
            <Projects onOpenDrawer={() => setDrawerOpen(true)} />
            <Repos username="1DeliDolu" perPage={6} onOpenDrawer={() => setDrawerOpen(true)} />
            <DeveloperInfo onOpenDrawer={() => setDrawerOpen(true)} />
          </>
        )}
      </Box>
      <Box
        sx={{
          ml: { xs: drawerOpen ? '240px' : '57px', sm: drawerOpen ? '240px' : '65px' },
          mr: { xs: drawerOpen ? '240px' : '57px', sm: drawerOpen ? '240px' : '65px' },
        }}
      >
        <Footer />
      </Box>
    </div>
  )
}

export default App
