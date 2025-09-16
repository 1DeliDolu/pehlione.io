import { styled, useTheme, type Theme, type CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DescriptionIcon from '@mui/icons-material/Description'
import FavoriteIcon from '@mui/icons-material/Favorite'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import WorkIcon from '@mui/icons-material/Work'
import FolderIcon from '@mui/icons-material/Folder'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarStyledProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarStyledProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
)

export type Props = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  onSelectMain: (view: 'default' | 'agentDoc') => void
}

function Header({ open, onOpen, onClose, onSelectMain }: Props) {
  const theme = useTheme()

  const navItems = [
    { key: 'cv', label: 'Lebenslauf', href: '#cv', icon: <DescriptionIcon />, detail: 'Kurzprofil und PDF-Download.' },
    { key: 'hobbies', label: 'Hobbys', href: '#hobbies', icon: <FavoriteIcon />, detail: 'Interessen und Freizeit.' },
    { key: 'certificates', label: 'Zertifikate', href: '#certificates', icon: <WorkspacePremiumIcon />, detail: 'Nachweise und Links.' },
    { key: 'projects', label: 'Projekte', href: '#projects', icon: <WorkIcon />, detail: 'Ausgewählte Arbeiten und Demos.' },
    { key: 'repos', label: 'Repositories', href: '#repos', icon: <FolderIcon />, detail: 'Neueste GitHub-Repositories.' },
    { key: 'developer', label: 'Anwendungsentwickler', href: '#developer', icon: <PersonIcon />, detail: 'Profil und Skills.' },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default" enableColorOnDark>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="a" href="#home" sx={{ textDecoration: 'none', color: 'inherit' }}>
            pehlione
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, ml: 'auto' }}>
            {navItems.map((item) => (
              <Button
                key={item.key}
                component="a"
                href={item.href}
                size="small"
                sx={{ color: 'text.primary' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={onClose} aria-label="close drawer">
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={item.key === 'cv' ? 'button' : 'a'}
                href={item.key === 'cv' ? undefined : item.href}
                onClick={() => {
                  if (item.key === 'cv') {
                    onSelectMain('agentDoc')
                    onClose()
                  }
                }}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.detail}
                  secondaryTypographyProps={{ sx: { fontSize: 12, color: 'text.secondary' } }}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* Details nicht im Drawer, sondern im Main angezeigt */}
      </Drawer>
    </Box>
  )
}

export default Header
